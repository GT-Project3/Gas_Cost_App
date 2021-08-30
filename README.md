<h1 align="center"> ETL PROJECT </h1>

I used election 2020 data to create a website that was served that data and generated graphs. The data was collected from Kaggle.com (https://www.kaggle.com/unanimad/us-election-2020) and the files used were: president_county.csv, president_county_candidate.csv, and president_state.csv.

![image](https://user-images.githubusercontent.com/77458990/128562777-3fd3268f-e2c4-47e9-9327-00b19718762a.png)
- - - 

I set up a backend server using MongoDB (create_mongodb.ipynb). I used Python to calculate the election percentages by state and by county and Flask to serve the data to a local server. 

![image](https://user-images.githubusercontent.com/77458990/128561443-3cdeae65-64a9-41f3-b46b-fd2290954545.png)
- - - 

Finally, I used JavaScript, D3, and Geojson information to create a dynnamic map the United States based on candidate win percentage at the state and county level. 
![image](https://user-images.githubusercontent.com/77458990/128561700-8db59cc4-cce0-48ef-a521-7e06d846381b.png)

(When a state is clicked on)
![image](https://user-images.githubusercontent.com/77458990/128561749-68d48f8f-4ca2-4e6c-9f81-03aa6cded0f7.png)
