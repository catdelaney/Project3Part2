import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ArticleList from '../components/ArticleList';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { author: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { author: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    userParam &&
    Auth.loggedIn() && 
    Auth.getProfile().data.author === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.author) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <div className="col-12 col-md-10 mb-5 text-white">
          <h3 className="text-white">Favorite Articles</h3>
          {user.favorites && user.favorites.length > 0 ? (
            <ArticleList
              articles={user.favorites}
              title="Your favorite articles..."
              showTitle={false}
              showUsername={false}
            />
          ) : (
            <p>You have no favorite articles yet.</p>
          )}
        </div>

        {!userParam && (
          <div className="col-12 col-md-10 mb-3 p-3">
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
