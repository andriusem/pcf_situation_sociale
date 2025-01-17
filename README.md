Situation Sociale PCF Component Documentation
Overview
The Situation Sociale component is a Power Apps Code Component Framework (PCF) solution designed to track and display social aid status for beneficiaries in the ILEYA application.
Technical Specifications
Component Structure
SituationSociale/

├── SituationSocialeComponent/       

│   ├── index.ts                     # Main component logic

│   ├── generated/                   # PCF generated files

│   ├── css/

│   │   └── SituationSociale.css    # Component styling

│   └── strings/

│       └── SituationSociale.1033.resx # Resource strings
Required Tables
cr399_beneficiary

Primary table for beneficiary information
Contains basic beneficiary details

cr399_socialaidstatus

Tracks social aid status records
Links to beneficiary records
Contains aid types and status information

cr399_socialnotes

Stores notes related to social aid status
Links to social aid status records
Data Fields
Field Name
Type
Description
Required
cr399_beneficiaryid
Lookup
Reference to beneficiary
Yes
cr399_aidtype
Text
Type of social aid
Yes
cr399_status
Text
Current status
Yes
cr399_actions
Text
Actions to take
No
cr399_datedebut
DateTime
Start date
Yes
cr399_datederniere
DateTime
Last modified date
Yes
cr399_datefin
DateTime
End date
No
cr399_situationfin
Text
Final situation
No

Setup Instructions
1. Development Environment Setup
# Install required tools

npm install -g pcf-cli

# Create new project

pac pcf init --namespace ILEYA --name SituationSociale --template field

# Install dependencies

npm install
2. Build and Test
# Clean project

npm run clean

# Build component

npm run build

# Start test harness

npm start watch
3. Testing with Sample Data
Create a CSV file with the following structure:

id,beneficiaryId,aidType,status,actions,dateDebut,dateDerniere,dateFin,situationFin

1,{beneficiaryId},RSA,Diagnóstique en cours,Collect documents,2024-01-13T00:00:00,2024-01-13T00:00:00,2024-02-15T00:00:00,Accompagnement réussi
Component Features
1. Grid Display
Shows social aid records in a grid format
Columns:
Type d'aide
Situation
Actions
Date début
Dernière modification
Date fin
Statut
Situation de fin
2. Data Handling
Loads records based on beneficiary ID
Formats dates to French locale
Handles missing/null values
Updates display automatically when data changes
3. Error Handling
Displays loading state while fetching data
Shows error messages when data loading fails
Gracefully handles missing or invalid data
Usage in Model-Driven App
1. Adding to a Form
Open the beneficiary form in Power Apps
Add new section for Situation Sociale
Add the component to the section
Configure data bindings:
Set beneficiaryId property
Configure dataset view
2. Configuration Options
Component width and height can be adjusted
Date format follows system locale settings
Column visibility controlled through manifest
Best Practices
1. Data Entry
Ensure all required fields are populated
Use consistent date formats (ISO format recommended)
Validate status transitions
2. Performance
Component optimized for displaying multiple records
Uses efficient data loading patterns
Implements proper error boundaries
3. Maintenance
Regular rebuilds recommended after changes
Test with sample data before deployment
Monitor for any error messages
Troubleshooting
Common Issues
Date Format Errors

Ensure dates are in ISO format
Check for null date values
Verify locale settings

Data Loading Issues

Verify beneficiary ID is correct
Check table permissions
Validate data set configuration

Display Problems

Clear browser cache
Rebuild component
Check CSS conflicts
Future Enhancements
Add filtering capabilities
Implement sorting options
Add inline editing
Enhance status visualization
Add export functionality
Support and Contact
For technical support or questions:

Check documentation first
Review error logs
Contact development team
Version History
v0.0.1 (2024-01-13)
Initial component creation
Basic grid display
Date formatting
Error handling

# pcf_situation_sociale
