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
  // if (
  //   Auth.loggedIn() && 
  //   /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's author, and compare it to the userParam variable */
  //   Auth.getProfile().authenticatedPerson.author === userParam
  // ) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn() || !user?.author) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (!userParam && Auth.getProfile().data.author === user.author) {
    return <Navigate to="/me" />;
  }
  
  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.author}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <ArticleList
            articles={user.articles}
            title={`${user.author}'s articles...`}
            showTitle={false}
            showUsername={false}
          />
        </div>

        <div className="col-12 col-md-10 mb-5">
          <h3 className="text-dark">Favorite Articles</h3>
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
          <div
            className="col-12 col-md-10 mb-3 p-3"
          >
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
