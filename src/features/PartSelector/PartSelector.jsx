import { useEffect, useState } from 'react';
import { getAllParts } from '../../api/parts';
import { Button } from '../../shared/Button/Button';
import style from './PartSelector.module.css';
import { createPortal } from 'react-dom';
import Loader from '../../shared/Loader/Loader';
import ErrorBox from '../../shared/ErrorBox';

export const PartSelector = ({
  isModalOpen,
  closeModal,
  addPartFn,
  loading,
}) => {
  const [partsList, setPartsList] = useState([]);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    async function loadParts() {
      const { data, error } = await getAllParts();
      if (error) {
        setErrMessage('Unable to retrieve parts');
      } else {
        setPartsList(data);
      }
    }

    loadParts();
  }, []);
  return (
    <>
      {isModalOpen &&
        createPortal(
          <dialog className={style['part-selector']} open={isModalOpen}>
            <h3>Add Part</h3>
            <ErrorBox error={errMessage} />
            <div className={style['part-list']}>
              {partsList.length > 0 ? (
                <>
                  {partsList.map((part) => (
                    <div className={style['selection-card']} key={part.id}>
                      <div className={style.details}>
                        <h4>{part.name}</h4>
                        <p>{part.sku}</p>
                      </div>
                      {loading ? (
                        <Loader />
                      ) : (
                        <Button
                          buttonType={'primary'}
                          action={() => {
                            addPartFn(part.id, part.name);
                            closeModal();
                          }}
                          text={
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e3e3e3"
                              >
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                              </svg>
                            </span>
                          }
                        />
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <p>No parts available</p>
              )}
            </div>
            <Button text={'Cancel'} action={closeModal} />
          </dialog>,
          document.body
        )}
    </>
  );
};
