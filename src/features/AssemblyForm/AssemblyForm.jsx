import { Link, useNavigate } from 'react-router';
import { Button } from '../../shared/Button/Button';
import { ButtonContainer } from '../../shared/ButtonContainer';
import ErrorBox from '../../shared/ErrorBox';
import FormField from '../../shared/FormField';
import { useRef, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { createAssembly } from '../../api/assemblies';

const AssemblyForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const partForm = useRef();
  const { session } = UserAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const assembly = {
      name: formData.get('assembly-name'),
      description: formData.get('description'),
      user_id: session.user.id,
    };

    const { error } = await createAssembly(assembly);
    if (error) {
      setErrorMessage('Uh oh, something went wrong');
      setLoading(false);
    } else {
      navigate('/assemblies');
    }
  }
  return (
    <div>
      <br />
      <form ref={partForm} onSubmit={submitData}>
        <FormField
          name="assembly-name"
          type={'text'}
          placeholder={'BMX Bike'}
          displayText={'Assembly Name'}
        />

        <label htmlFor="description">
          <span>Description</span>
          <textarea
            name="description"
            placeholder="A bike made for urban street riding"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <ErrorBox error={errorMessage} />
        <ButtonContainer>
          <Link to={'/assemblies'}>Cancel</Link>
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

export default AssemblyForm;
