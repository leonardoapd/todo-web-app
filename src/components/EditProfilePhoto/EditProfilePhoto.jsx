import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { uploadAvatar } from '../../services/user-services';
import { updateUserPhoto } from '../../services/user-services';
import toast from 'react-hot-toast';
import './EditProfilePhoto.css';
import images from '../../constants/images';

export default function EditProfilePhoto({ userInfo }) {
	// const [file, setFile] = useState(null);
	// const [error, setError] = useState('');
	const { user, editUser } = useUser();
	const [photo, setPhoto] = useState(null);

	useEffect(() => {
		// Intenta obtener la imagen del caché local
		const cachedPhoto = localStorage.getItem('userPhoto');
		if (cachedPhoto) {
			setPhoto(cachedPhoto);
		}

		return () => {
			toast.dismiss();
		};
	}, []);

	const handleChange = async (e, file) => {
		console.log('handleChange');
		const selectedFile = file === undefined ? e.target.files[0] : file;

		// Validate file type and size
		if (!selectedFile) {
			// setError('Please select a file');
			console.log('Please select a file');
			toast.error('Please select a file');
			return;
		}

		if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png') {
			// setError('File type not supported');
			console.log('File type not supported');
			toast.error('File type not supported');
			return;
		}

		if (selectedFile.size > 1000000) {
			// setError('File size cannot exceed more than 1MB');
			console.log('File size cannot exceed more than 1MB');
			toast.error('File size cannot exceed more than 1MB');
			return;
		}

		// setError('');
		// setFile(selectedFile);
		// Preview selected file in the browser
		const previewUrl = URL.createObjectURL(selectedFile);
		localStorage.setItem('userPhoto', previewUrl);
		setPhoto(previewUrl);

		const formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('FileName', selectedFile.name);
		formData.append('FileType', selectedFile.type);
		formData.append('FolderName', 'ProfilePictures');

		// Upload selectedFile to the server
		const response = await uploadAvatar(formData);
		// // Update user info
		editUser({ ...user, photo: response });

		// Update user photo in the server
		toast.promise(
			updateUserPhoto(response),
			{
				loading: 'Updating photo...',
				success: 'Photo updated!',
				error: 'Could not update photo',
			},
			{ icon: '🖼️' }
		);
		// const updatedUser = await updateUserPhoto(response);
	};

	return (
		<div className='edit-profile-photo'>
			<div className='edit-profile-photo__container'>
				<img src={photo || userInfo?.photo || images.user} alt='profile photo' className='user-img' />
				<input
					className='edit-profile-photo__input'
					title='profile photo'
					name='photo'
					id='profile-photo'
					type='file'
					accept='image/png, image/jpeg'
					onChange={handleChange}
				/>
				<label htmlFor='profile-photo' className='edit-profile-photo__btn change-img__button'>
					<i className='material-symbols-outlined'>camera</i>
				</label>
			</div>

			{/* {error && <p className='error'>{error}</p>} */}
		</div>
	);
}
