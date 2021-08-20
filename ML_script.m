% Clean the data by removing outliers and treating missing data
% Identify a parametric or nonparametric predictive modeling approach to use
% Preprocess the data into a form suitable for the chosen modeling algorithm
% Specify a subset of the data to be used for training the model
% Train, or estimate, model parameters from the training data set
% Conduct model performance or goodness-of-fit tests to check model adequacy
% Validate predictive modeling accuracy on data not used for calibrating the model
% Use the model for prediction if satisfied with its performance

%THIS CODE WILL PREDICT PRICES IN THE FUTURE BASED ON A REGION
%PUT ALL PREDICTIONS INTO A CSV FOR A USER TO USE IN PYTHON LATER

%download travel dataframe
filename = 'oil_prices.csv';
travel_data = readtable(filename);
inputNames = {'date','location','grade'};
outputNames = {'price'};
travelAttributes = [inputNames,outputNames];
TT = table2timetable(travel_data);

%import data
%travel_data = table(dataArray{1:end-1}, 'VariableNames', {'VarName1','VarName2','VarName3','VarName4','VarName5','VarName6','VarName7','VarName8','VarName9',
%'VarName10','VarName11','VarName12','VarName13','VarName14'});
%reads into table

% travel_data.Properties = travelAttributes;
x_date = travel_data{:,1};
x_location = travel_data{:,3};
x_grade = travel_data{:,4};
y_price = travel_data(:,2);

for 1:length(TT)
    if(
        
    else
        
    end
end



stackedplot(TT)
%C = [x_date, y_price]

% datetime.setDefaultFormats('defaultdate','yyyy-MM-dd')
%TT = table2timetable(travel_data,{'date','price', 'location', 'grade'});
%plot(x_date,y_price)

%train regression tree
rng(5); % For reproducibility

% Set aside 90% of the data for training
cv = cvpartition(height(travel_data),'holdout',0.1);

t = RegressionTree.template('MinLeaf',5);
mdl_dateprice = fitensemble(x_date(cv.training,:),y_price(cv.training,:),'LSBoost',500,t,...
    'PredictorNames',inputNames,'ResponseName',outputNames,'LearnRate',0.01);

L = loss(mdl,X(cv.test,:),y(cv.test),'mode','ensemble');
fprintf('Mean-square testing error = %f\n',L);


%Plot fit data
figure(1);
% plot([y(cv.training), predict(mdl,X(cv.training,:))],'LineWidth',2);
plot(y(cv.training),'b','LineWidth',2), hold on
plot(predict(mdl,X(cv.training,:)),'r.-','LineWidth',1,'MarkerSize',15)

% Observe first hundred points, pan to view more
xlim([0 100])
legend({'Actual','Predicted'})
xlabel('Training Data point');
ylabel('Gas Price');

%From this model, we can generate future points

ypred = predict(mdl,Xnew)
[ypred,yci] = predict(mdl,Xnew)
[ypred,yci] = predict(mdl,Xnew,Name,Value)

