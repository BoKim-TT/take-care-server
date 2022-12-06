# Take care 



https://user-images.githubusercontent.com/25041649/206004197-b920936c-b323-40ce-b670-b38863a3d92b.mp4




# Overview

Personal healthcare record web app that registered user can keep their health records such as lab data and medication use.

# Purpose

This project aims to improve healthcare outcomes and help users save time and money by having instant access to their medication history and lab results.

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






