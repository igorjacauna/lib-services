import { User } from '@firebase/auth';
import { Ref, inject } from 'vue';

const useUserInject = () => {

  const user = inject<Ref<User | null>>('user');

  return user;
};

export default useUserInject;
