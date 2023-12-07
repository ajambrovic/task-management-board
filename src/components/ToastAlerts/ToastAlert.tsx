import { NetworkRequestStatus } from 'domain/networkRequest/networkRequestModel';
import { selectTaskLoadingError, selectTasksNetworkStatus } from 'domain/tasks/tasksSelector';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from 'redux/hooks';

export const ToastAlert = () => {
  const errorMessage = useAppSelector(selectTaskLoadingError);
  const networkRequestStatus = useAppSelector(selectTasksNetworkStatus);
  useEffect(() => {
    if (errorMessage !== '' && networkRequestStatus === NetworkRequestStatus.Fail) {
      toast.error(errorMessage);
    }
  }, [errorMessage, networkRequestStatus]);

  return <ToastContainer />;
};
