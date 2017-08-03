import React from 'react';
import cx from 'classnames';

export const FlashMessage = ({ message, error, onDismiss }) => {
	if (!message) return false;

	const classNames = cx(
		'alert alert-dismissable',
		{ 'alert-info': !Boolean(error) },
		{ 'alert-danger': Boolean(error) },
	);

	const decorator = Boolean(error) ? 'Oops!' : 'Success!';

	return (
		<div className='flashMessage container'>
			<div className={classNames} role='alert'>
				<button onClick={onDismiss} type='button' className='close' data-dismiss='alert' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>
				<strong>{decorator}</strong> {message}
			</div>
		</div>
	);
};
