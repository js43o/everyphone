import { useRef, useState } from 'react';

const useAlertModal = () => {
  const [alertOpened, setAlertOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const alertTimer = useRef<NodeJS.Timeout>();

  const activateAlert = (message: string) => {
    setAlertOpened(true);
    setErrorMessage(message);
    if (alertTimer.current) clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setAlertOpened(false), 2000);
  };

  const closeAlert = () => setAlertOpened(false);

  return { alertOpened, errorMessage, activateAlert, closeAlert };
};

export default useAlertModal;
