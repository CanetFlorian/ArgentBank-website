import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserProfileQuery } from '../../store/apiSlice';
import { setUser } from '../../store/userSlice';

export default function Profile() {

  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.user);
  const { data, error , isLoading, isError} = useGetUserProfileQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser({
        firstName: data.body.firstName,
        lastName: data.body.lastName,
        userName: data.body.userName,
      }));
    }
  }, [data, dispatch]);

    return (
    <main class="main bg-dark">
        <div class="header">
            <h1>Welcome back<br />
            {isLoading ?  'Chargement' : `${firstName} ${lastName}!`}
            </h1>
            <button class="edit-button">Edit Name</button>
            </div>

            {isError &&(
              <p style={{ color:'red'}}>
                Erreur de chargement du profil : {error?.data?.mes}
              </p>
            )}
            <h2 class="sr-only">Accounts</h2>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Checking (x8349)</h3>
          <p class="account-amount">$2,082.79</p>
          <p class="account-amount-description">Available Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Savings (x6712)</h3>
          <p class="account-amount">$10,928.42</p>
          <p class="account-amount-description">Available Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Credit Card (x8349)</h3>
          <p class="account-amount">$184.30</p>
          <p class="account-amount-description">Current Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
    );
}