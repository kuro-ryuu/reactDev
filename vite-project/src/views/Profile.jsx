import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

  const userInfo = Object.entries(user ?? {}).filter(
    ([key, value]) =>
      !/password|token|secret/i.test(key) &&
      (typeof value !== 'object' || value === null),
  );

  return (
    <section>
      <h1>Profile</h1>
      {!user && <p role="alert">No authentication token found.</p>}
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
