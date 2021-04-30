import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ history, createProfile, auth: {user} }) => {
  const [formData, setformData] = useState({
    company: '',
    location: '',
    website: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    instagram: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    twitter: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  useEffect(() => {
    setformData({ ...formData, name: user.name });
  }, []);
  const {
    company,
    location,
    website,
    status,
    skills,
    githubusername,
    bio,
    instagram,
    facebook,
    youtube,
    linkedin,
    twitter,
  } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <div className='create-profile'>
        <h1 class='large text-primary'>Create Your Profile</h1>
        <p class='lead'>
          <i class='fas fa-user'></i> Provide some information to make your
          profile stand out
        </p>
        <form class='form' onSubmit={(e) => onSubmit(e)}>
          <div class='form-group'>
            <select name='status' value={status} onChange={(e) => onChange(e)}>
              <option value='0'>* Select Professional Status</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Student'>Student</option>
              <option value='Instructor'>Instructor</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Company'
              name='company'
              value={company}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={website}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='* Skills'
              name='skills'
              value={skills}
              onChange={(e) => onChange(e)}
            />
            <small class='form-text'>
              Please use comma separated values (eg. React.js,Node.js,Java)
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Github Username'
              name='githubusername'
              value={githubusername}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>

          <div class='my-2'>
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type='button'
              class='btn btn-light'
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <Fragment>
              <div class='form-group social-input'>
                <i class='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class='form-group social-input'>
                <i class='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div class='form-group social-input'>
                <i class='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div class='form-group social-input'>
                <i class='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div class='form-group social-input'>
                <i class='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input type='submit' class='btn btn-primary my-1' />

          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
