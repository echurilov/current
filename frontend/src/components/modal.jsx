import React from 'react';
import '../css/modal.css'
import { closeModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import LoginForm from './session/login_form';
import SignupForm from './session/signup_form';
import Bookmark from './bookmarks_modal';
import Instructions from './instructions';

function Modal({ modal, closeModal, bookmarkFunc }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'login':
      component = <LoginForm/>;
      break;
    case 'signup':
      component = <SignupForm/>;
      break;
    case 'instructions':
      component = <Instructions />
      break;
    case 'bookmark':
      component = <Bookmark bookmarkFunc={bookmarkFunc}/>;
      return (
        <div className="modal-background-bookmark" onClick={closeModal}>
          <div className="modal-child-bookmark" onClick={e => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);