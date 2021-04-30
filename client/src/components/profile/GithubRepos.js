import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getRepos } from '../../actions/profile';
import { connect } from 'react-redux';

const GithubRepos = ({ username, getRepos, repos }) => {
  useEffect(() => {
    getRepos(username);
  }, [getRepos]);

  // console.log(repos);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos === null ? (
        <h2>No repos found</h2>
      ) : (
        repos.map((repo) => (
          <div key={repo} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

GithubRepos.propTypes = {
  repos: PropTypes.array.isRequired,
  getRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getRepos })(GithubRepos);
