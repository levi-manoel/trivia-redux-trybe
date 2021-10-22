import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    const { email } = this.props;
    const gravatarMD5 = md5(email).toString();

    this.state = {
      gravatarURL: `https://www.gravatar.com/avatar/${gravatarMD5}`,
    };
  }

  render() {
    const { name } = this.props;
    const { gravatarURL } = this.state;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ gravatarURL }
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
