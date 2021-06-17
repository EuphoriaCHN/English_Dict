import { useSelector } from 'react-redux';
import { Store } from '@/store';

function Platform() {
    const userStore = useSelector<Store, Store['user']>(state => state.user);

    return <h1>{userStore.user.account}</h1>;
}

export default Platform;
