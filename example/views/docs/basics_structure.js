{
	pageTitle: 'Directory Structure',

	content: Html.p('Within the root directory of a stock install, you will find two folders. One named "_core", this contains core NWT classes and libraries, and one named "example". The "example" folder contains a fully functioning application.') + 
	Html.h3('Creating Applications') +
	Html.p('Each application resides in a folder directly under the root folder. Once you have created the folder, you should open nwt/config.connections.js, and create an entry there. At the most basic form, this file maps a hostname to an application folder. Each application generally has a folders named "views", and a folder named "models". Take a look around the example application to become familiar with this directory structure.') +
	Html.h3('Static Resources') +
	Html.p('If you are serving static resources from your NWT installation, we recommend that you place the resources specific to each application inside of that folder. There is no enforced convention, but we recommend placing CSS files inside of nwt/application/css/***.css and images at: nwt/application/img/***.***.')
}