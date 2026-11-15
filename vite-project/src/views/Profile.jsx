import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const {getUserByToken} = useUser();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    let active = true;

    if (!token) {
      return undefined;
    }

    const loadUser = async () => {
      try {
        const userData = await getUserByToken(token);
        if (active) {
          setUser(userData);
        }
      } catch (fetchError) {
        console.error('Failed to fetch user:', fetchError);
        if (active) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Failed to fetch user information.',
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadUser();
    return () => {
      active = false;
    };
  }, [getUserByToken, token]);

  const userInfo = Object.entries(user ?? {}).filter(
    ([key, value]) =>
      !/password|token|secret/i.test(key) &&
      (typeof value !== 'object' || value === null),
  );

  return (
    <section>
      <h1>Profile</h1>
      {loading && <p>Loading user information...</p>}
      {(error || (!token && 'No authentication token found.')) && (
        <p role="alert">{error || 'No authentication token found.'}</p>
      )}
      {user && (
        <dl>
          {userInfo.map(([key, value]) => (
            <div key={key}>
              <dt>{key.replaceAll('_', ' ')}</dt>
              <dd>{String(value)}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
};

export default Profile;
