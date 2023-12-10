import './UserOptions.css';
import EditProfilePhoto from '../EditProfilePhoto/EditProfilePhoto';
import { images } from '../../constants';

export default function UserOptions({ userInfo, handleLogout }) {

	return (
		<>
			<div className='user-options'>
				<div className='user-profile'>
					<EditProfilePhoto userInfo={userInfo} />
					<div className='user-info'>
						<p className='user-name'>{userInfo.name}</p>
						<p className='user-email'>{userInfo.email}</p>
					</div>
				</div>
				<button className='logout__button' onClick={handleLogout}>
					<i className='material-symbols-outlined'>logout</i>
					Logout
				</button>
			</div>
		</>
	);
}
