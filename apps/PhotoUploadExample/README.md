#Bazaarvoice Titanium SDK - Photo Review Upload Example

###Version: 1.0

This example illustrates using the Bazaarvoice iOS SDK to submit a photo-review that include a user generated photo (camera/gallery), star rating and review text. 

Notable files include:

Resources/Ui/Handheld/ProductScreen.js - Illustrates camera access, initiates a photo upload via the BV SDK.

Resources/Ui/Handheld/FormScreen.js - Illustrates handling of photo upload, review Submission.  Note that the photo upload is done in the background while the user is free to fill out the submission form.

Resources/stars/Stars.js - A custom widget for star ratings.

---

To import into TitaniumStudio:

1. Choose File->Import
2. Under "Titanium" select "Existing Titanium Project"
3. Select "Browse" next to "Project Directory" and navigate to the PhotoUploadExample directory.  Click "Open."
4. TitaniumStudio will import the reference app into the Project Explorer.  
5. To run, option-click/right-click on the root of the project in the Project Explorer and select "Run As"->IPhone/Android Simulator. 