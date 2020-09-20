import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showContentPolicyDispatch } from '../../store/actions/actions';
import './FanContentPolicy.css';

const FanContentPolicy = () => {
    let closeContentPolicyClass = useSelector(state => state.showContentPolicy);
    const dispatch = useDispatch();

    const closeContentPolicy = (e) => {
        e.preventDefault();
        dispatch(showContentPolicyDispatch());
    }

    return (
        <div id="contentPolicyContainer" className={closeContentPolicyClass}>
            <div id="contentPolicyText">
                <span>MTG React Project is unofficial Fan Content permitted under the <a href="https://company.wizards.com/fancontentpolicy" target="_blank" rel="noopener noreferrer">Fan Content Policy</a>. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.</span>
            </div>
            <div id="contentPolicyClose">
                <a href="/#" onClick={closeContentPolicy}><i className="fas fa-times" ></i></a>
            </div>
        </div>
    )
}

export default FanContentPolicy;
