% Clean the data by removing outliers and treating missing data
% Identify a parametric or nonparametric predictive modeling approach to use
% Preprocess the data into a form suitable for the chosen modeling algorithm
% Specify a subset of the data to be used for training the model
% Train, or estimate, model parameters from the training data set
% Conduct model performance or goodness-of-fit tests to check model adequacy
% Validate predictive modeling accuracy on data not used for calibrating the model
% Use the model for prediction if satisfied with its performance


%download travel dataframe
filename = 'travel.csv'; %need the table
inputNames = {'Car','Region','State','Grade', 'Price'};
outputNames = {'Future_Price'};
travelAttributes = [inputNames,outputNames];

%import data
formatSpec = '%8f%7f%8f%3f%8f%8f%7f%8f%4f%7f%7f%7f%7f%f%[^\n\r]';
fileID = fopen(filename,'r');
dataArray = textscan(fileID, formatSpec, 'Delimiter', '', 'WhiteSpace', '',  'ReturnOnError', false);
fclose(fileID);
travel_data = table(dataArray{1:end-1}, 'VariableNames', {'VarName1','VarName2','VarName3','VarName4','VarName5','VarName6','VarName7','VarName8','VarName9',
'VarName10','VarName11','VarName12','VarName13','VarName14'});

% Delete the file and clear temporary variables
clearvars filename formatSpec fileID dataArray ans;
delete travel.csv




%reads into table
travel_data.Properties.VariableNames = travelAttributes;
X = travel_data{:,inputNames};
y = trvael_data{:,outputNames};

%train regression tree
rng(5); % For reproducibility

% Set aside 90% of the data for training
cv = cvpartition(height(travel_data),'holdout',0.1);

t = RegressionTree.template('MinLeaf',5);
mdl = fitensemble(X(cv.training,:),y(cv.training,:),'LSBoost',500,t,...
    'PredictorNames',inputNames,'ResponseName',outputNames{1},'LearnRate',0.01);

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


