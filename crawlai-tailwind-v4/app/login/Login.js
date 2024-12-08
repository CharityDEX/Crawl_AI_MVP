import { useRouter } from "next/navigation";
import { login } from '@/app/redux/slices/loginSlice';

import { useDispatch } from 'react-redux'

const loginApp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleButtonPress = () => {
    dispatch(login());
    router.push("/");
  }

  return (
    <div>
      <h1>Hello World</h1>
      <button className="btns" onClick={handleButtonPress}>Go Back</button>
    </div>
  );
}

export default loginApp;
