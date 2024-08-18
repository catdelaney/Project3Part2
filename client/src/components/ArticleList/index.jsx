import { Link } from 'react-router-dom';

const ArticleList = ({ articles, title, showTitle = true, showUsername = true }) => {
  if (!articles.length) {
    return <h3>No Articles Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {articles.map(article => (
        <div key={article._id} className="card mb-3">
          <h5 className="card-header bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link className="text-light" to={`/profiles/${article.author}`}>
                Title: {article.title}
                <br/>
                Author: {article.author} <br />
                <span style={{ fontSize: '1rem' }}>
              </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                </span>
              </>
            )}
          </h5>
          <div className="card-body bg-light p-2">
            <p>{article.content}</p>
          </div>
          <Link className="btn btn-primary btn-block btn-squared" to={`/articles/${article._id}`}>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
