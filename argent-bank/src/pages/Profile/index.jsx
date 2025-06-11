import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetUserProfileQuery,
  useUpdateUsernameMutation,
} from '../../store/apiSlice';
import { setUser } from '../../store/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { firstName, lastName, userName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);

  console.log('Token from Redux in Profile:', token);

  
  const { data, error, isLoading, isError } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  const [updateUsername, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
    useUpdateUsernameMutation();

  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    if (data) {
      dispatch(
        setUser({
          firstName: data.body.firstName,
          lastName: data.body.lastName,
          userName: data.body.userName,
        })
      );
    }
  }, [data, dispatch]);

  const handleEditClick = () => {
    setNewUsername(userName || '');
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = async () => {
 if (!token) {
  console.log("Token non prêt, attente...");
  return <main className="main bg-dark"><p>Chargement du profil...</p></main>;
}

    try {
      const result = await updateUsername(newUsername).unwrap();
      dispatch(
        setUser({
          firstName,
          lastName,
          userName: result.body.userName,
        })
      );
      setEditMode(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour du nom d'utilisateur:", err);
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {!editMode ? (
          <>
            <h1>
              Welcome back
              <br />
              {isLoading ? 'Chargement en cours...' : `${firstName} ${lastName}!`}
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        ) : (
            <div className="edit-formulaire">
              <h2>Edit user info</h2>
              <div className="form-groupe">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                disabled={isUpdating}
              />
            </div>
            <div className="form-groupe">
              <label>First name: </label>
              <input type="text" value={firstName} disabled />
            </div>
            <div className="form-groupe">
              <label>Last name: </label>
              <input type="text" value={lastName} disabled />
            </div>
            <div className="form-buttons">
              <button className="edit-button" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? 'Sauvegarde en cours...' : 'Sauvegarder'}
              </button>
              <button className="edit-button" onClick={handleCancel} disabled={isUpdating}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {isError && (
        <p style={{ color: 'red' }}>
          Erreur de chargement du profil : {error?.data?.message || 'Erreur inconnue'}
        </p>
      )}

      {isUpdateError && (
        <p style={{ color: 'red' }}>
          Erreur lors de la mise à jour : {updateError?.data?.message || 'Erreur inconnue'}
        </p>
      )}

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
