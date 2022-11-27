# Take care 

<img width="1320" alt="homePage" src="https://user-images.githubusercontent.com/25041649/204112163-7a33a46b-ca39-4f50-8627-3f8ec5768b3a.png">
<img width="1314" alt="Screen Shot 2022-11-26 at 6 26 52 PM" src="https://user-images.githubusercontent.com/25041649/204112613-a7d6bad7-9b82-4c20-8620-3835339f96da.png">
<img width="922" alt="Screen Shot 2022-11-26 at 6 27 40 PM" src="https://user-images.githubusercontent.com/25041649/204112624-a6c36d0d-c01b-4cf4-8cb0-be450c86c180.png">
<img width="921" alt="Screen Shot 2022-11-26 at 6 29 00 PM" src="https://user-images.githubusercontent.com/25041649/204112631-ee9d669f-58aa-4b88-9807-9da48062f8c4.png">


# Overview

Personal healthcare record web app that registered user can keep their health records such as lab data and medication use.

# Purpose

This app could save people time and money when managing their health conditions by remembering the side effects of certain medications or recommendations from their prescribers

# Features

#### Home page
- current medical news fetched from Mediastack API 
- sign in or sign up with email account (using Oauth and bcrypt)

#### MyMeds page 
- user can create, edit and delete their mediction records including dose, direction, prescriber info, side effects, positive effects or physician's comment
- user also can check information about their medication, which is fetched from the US National Library of Medicine
  
#### MyLabs page 
- user can create, edit and delete their lab records including test area, result and laboratoy name
- user also can check information about their lab result, which is fetched from the US National Library of Medicine

# Technologies

 #### Client:

 - ReactJS
 - Styled-components
 
 #### Server:

- ExpressJS
- MongoDB

# APIs
- Oauth: to authenticate users
- Mediastack API : to fetch health news on the homepage
- MedlinePlus API : to fetch information that is related to user's health record such as medication or lab results


# Setup

```
$yarn install
$yarn start
```






