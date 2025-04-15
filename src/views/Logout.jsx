import { useUserContext } from '../hooks/contextHooks';

const Logout = () => {
    const { handleLogout } = useUserContext();
    handleLogout();
    return null;
};

export default Logout;
