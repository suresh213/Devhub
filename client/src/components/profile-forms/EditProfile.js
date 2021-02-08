import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';
const EditProfile = ({
  profile: { profile, loading },
  history,
  createProfile,
  getCurrentProfile,
}) => {
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
    createProfile(formData, history, true);
  };

  useEffect(() => {
    getCurrentProfile();
    setformData({
      bio: loading || !profile.bio ? '' : profile.bio,
      location: loading || !profile.location ? '' : profile.location,
      website: loading || !profile.website ? '' : profile.website,
      skills: loading || !profile.skills ? '' : profile.skills,
      status: loading || !profile.status ? '' : profile.status,
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      company: loading || !profile.company ? '' : profile.company,
      twitter: loading || !profile.twitter ? '' : profile.twitter,
      linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
      facebook: loading || !profile.facebook ? '' : profile.facebook,
      youtube: loading || !profile.youtube ? '' : profile.youtube,
      instagram: loading || !profile.instagram ? '' : profile.instagram,
    });
  }, [loading]);
  return (
    <Fragment>
      <div className='form-container1'>
        <h1 class='large text-primary'>Edit Profile</h1>
        <p class='lead'>
          <i class='fas fa-user'></i> Let's get some information to make your
          profile stand out
        </p>
        <form class='form' onSubmit={(e) => onSubmit(e)}>
          <div class='form-group'>
            <select name='status' value={status} onChange={(e) => onChange(e)}>
              <option value='0'>* Select Professional Status</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Student'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Other'>Other</option>
            </select>
            <small class='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Company'
              name='company'
              value={company}
              onChange={(e) => onChange(e)}
            />
            <small class='form-text'>
              Could be your own company or one you work for
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={website}
              onChange={(e) => onChange(e)}
            />
            <small class='form-text'>
              Could be your own or a company website
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small class='form-text'>
              City & state suggested (eg. Boston, MA)
            </small>
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
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
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
            <small class='form-text'>
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div class='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small class='form-text'>Tell us a little about yourself</small>
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
