import { Link, useNavigate } from 'react-router';
import { Button } from '../../shared/Button/Button';
import { ButtonContainer } from '../../shared/ButtonContainer';
import ErrorBox from '../../shared/ErrorBox';
import FormField from '../../shared/FormField';
import { useRef, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { addPart } from '../../api/parts';

const PartForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const partForm = useRef();
  const { session } = UserAuth();
  const navigate = useNavigate();

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const part = {
      name: formData.get('part-name'),
      quantity: formData.get('quantity'),
      price: formData.get('price'),
      sku: formData.get('sku'),
      user_id: session.user.id,
    };

    const { error } = await addPart(part);
    if (error) {
      setErrorMessage('Uh oh, something went wrong');
      setLoading(false);
    } else {
      navigate('/dashboard');
    }

    console.log(part);
  }
  return (
    <div>
      <br />
      <form ref={partForm} onSubmit={submitData}>
        <FormField
          name="part-name"
          type={'text'}
          placeholder={'Pedal Set, Grey'}
          displayText={'Part Name'}
        />
        <FormField
          name="sku"
          type={'text'}
          displayText={'SKU'}
          placeholder={'PEDAL-SET-GRAY'}
        />
        <FormField
          name="price"
          type={'number'}
          displayText={'Price ($)'}
          placeholder={'8.34'}
        />
        <FormField
          name="quantity"
          type={'number'}
          displayText={'Quantity'}
          placeholder={'2'}
          intStep={true}
        />

        <ErrorBox error={errorMessage} />
        <ButtonContainer>
          <Link to={'/dashboard'}>Cancel</Link>
          <Button
            text={loading ? 'Creating' : 'Create Part'}
            buttonType={'primary'}
            disabled={loading}
          />
        </ButtonContainer>
      </form>
    </div>
  );
};

export default PartForm;
