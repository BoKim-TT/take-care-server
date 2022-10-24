
# Introduction

Personal healthcare record web app that registered user can keep their health records such as lab data and medication use.\
User can log in via gmail accounts or sign up with other email account (using Oauth and bcrypt).\
Loged in user can create, edit and delete their records.\
User can also check information or reference regarding their medication and lab results via MEDLINEPLUS API.

# Features

#### Home page
- current medical news / log in 

#### MyMeds page 
- post new medication use records including dose, direction, prescriber info, side effects, positive effects or physician's comment
- read all the posts users created in the past or edit and delete as needed
- medication info link to U.S. National Library of Medicine
#### MyLabs page 
- post new lab test results including test area, result and laboratoy name
- read all the posts users created in the past or edit and delete as needed
- reference link to U.S. National Library of Medicine

# Technologies

 #### Client:

 - ReactJS
 - Styled-components
 
 #### Server:

- ExpressJS
- MongoDB

# Setup

```
$yarn install
$yarn start
```

# APIs
- Oauth: to authenticate users
- Mediastack API : to fetch health news on the homepage
- MedlinePlus API : to fetch information that is related to user's health record such as medication or lab results



