// reference: https://stackoverflow.com/questions/42217052/how-to-upload-a-file-via-post-dopost-to-a-google-scripts-web-app
function doGet(e) {
    return message("Error: no parameters");
  }
  function doPost(e) {
    const folderLink = e.parameters.folderLink ? e.parameters.folderLink[0] : null;
    let folderId
    if (folderLink) {
      try {
        const match = folderLink.match(/[-\w]{25,}/); // Extract folder ID from the link
        if (match) {
          folderId = match[0];
          const folder = DriveApp.getFolderById(folderId);
          folder.getName(); // Test if the folder is accessible
        } else {
  
          throw new Error("Invalid folder link");
        }
      } catch (error) {
    let folderId = "1f6V_yv0nyse3ZqEJ4BkuUWq2OmAQc3G0"; // Default folder ID
  
          return  uploadFile(e, folderId, "Invalid folder or no access. Default folder will be used: ")
  
        
      }
    }
  
    if (!e.parameters.filename || !e.parameters.file) {
      return message("Error: Bad parameters");
    } else {
     return  uploadFile(e, folderId, "File uploaded successfully: ")
  
    }
  }
  function uploadFile(e, folderId, text_message){
     const data = Utilities.base64Decode(e.parameters.file, Utilities.Charset.UTF_8);
      const blob = Utilities.newBlob(data, e.parameters.mimeType, e.parameters.filename);
      const folder = DriveApp.getFolderById(folderId);
      const file = folder.createFile(blob);
      return message(text_message + file.getUrl());
  }

  
function message(msg) {
    return ContentService.createTextOutput(JSON.stringify({result: msg})).setMimeType(ContentService.MimeType.JSON);
  }