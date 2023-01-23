import axios from 'axios';

// export function downloadFile(name) {
//     fetch(`${process.env.REACT_APP_API}/media/photos/${name}`, {
//         method: 'GET',
//         headers: {
//         'Content-Type': 'application/image',
//         },
//     })
//     .then((response) => response.blob())
//     .then((blob) => {
//         // Create blob link to download
//         const url = window.URL.createObjectURL(
//         new Blob([blob]),
//         );
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute(
//         'download',
//         `FileName.pdf`,
//         );

//         // Append to html link element page
//         document.body.appendChild(link);

//         // Start download
//         link.click();

//         // Clean up and remove the link
//         link.parentNode.removeChild(link);
//     });
// }

export const downloadFile = (name) => {

    const config ={
        headers: {
            'Content-Type': 'application/image',
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*'
        }
    };
    axios.get(`${process.env.REACT_APP_API}/media/photos/${name}`, config)
    .then((res) => res.blob())
    .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
        new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
        'download',
        `FileName.pdf`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
    });
      
};

// export function downloadFile(url, name) {
//     fetch(url).then(async (res) => {
//         const dfile = await res.blob();
//         fileDownload(dfile, name)
//     });
// }

// export function downloadFile(url, name) {
//     fetch(url).then(async (res) => {
//         const dfile = await res.blob();
//         var blobURL = 
//           window.URL && window.URL.createObjectURL
//             ? window.URL.createObjectURL(dfile)
//             : window.webkitURL.createObjectURL(dfile);
//         var tempLink = document.createElement("a");
//         tempLink.style.display ="none";
//         tempLink.href = blobURL;
//         tempLink.setAttribute("download", name);

//         if (typeof tempLink.download === "undefined") {
//             tempLink.setAttribute("target", "_blank")
//         }

//         document.body.appendChild(tempLink)
//         tempLink.click();

//         setTimeout(function () {
//             document.body.removeChild(tempLink);
//             window.URL.revokeObjectURL(blobURL);
//         }, 200);
//     });
// }