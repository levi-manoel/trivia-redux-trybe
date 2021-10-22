import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const gravatarMD5 = md5(email).toString();
    const imageSource = `https://www.gravatar.com/avatar/${gravatarMD5}`;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ imageSource }
            alt="user gravatar"
          />
          <h3 data-testid="header-player-name">{ name }</h3>
        </div>
        <div>
          <span data-testid="header-score">Score: 0</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.userReducer.email,
    name: state.userReducer.name,
  };
}

export default connect(mapStateToProps)(Header);
