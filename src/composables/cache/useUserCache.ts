import { User} from '@/types/interfaces';

export const useCacheUser = () => {

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    function cacheUser(userData: User) {
        localStorage.setItem('user', JSON.stringify(userData)); // Cache in localStorage
        localStorage.setItem('isAuthenticated', 'true');
    }
    
    function loadUser(): User | null {
        const userData = localStorage.getItem('user');
        if (userData) {
          return JSON.parse(userData); // Load from localStorage          
        }

        return null;
    }

    function clearUser() {
        localStorage.removeItem('user'); // Remove from localStorage
        localStorage.removeItem('isAuthenticated');
    }

    return { cacheUser, loadUser, clearUser, isAuthenticated };
}