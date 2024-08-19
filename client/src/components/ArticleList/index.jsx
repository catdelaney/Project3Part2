import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FAVORITE_ARTICLE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const ArticleList = ({ articles, title, showTitle = true, showUsername = true }) => {
  const [favoriteArticle] = useMutation(FAVORITE_ARTICLE, {
    update(cache, { data: { favoriteArticle } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, favorites: favoriteArticle.favorites } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFavorite = async (articleId) => {
    try {
      await favoriteArticle({ variables: { articleId } });
    } catch (e) {
      console.error(e);
    }
  };

  if (!articles.length) {
    return <h3>No Articles Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {articles.map((article) => (
        <div key={article._id} className="card mb-3">
          <h5 className="card-header bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link
                className="text-light"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Title: {article.title}
                <br />
                Author: {article.author}
                <br />
              </Link>
            ) : (
               <span style={{ fontSize: '1rem' }}></span>
            )}
          </h5>
          <div className="card-body bg-light p-2">
            <p>{article.content}</p>
          </div>
          <Link
            className="btn btn-primary btn-block btn-squared"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Full Article
          </Link>
          <button
            className="btn btn-secondary btn-block btn-squared"
            onClick={() => handleFavorite(article._id)}
          >
            Favorite
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
