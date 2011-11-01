{
	pageTitle: 'Directory Structure',

	content: Html.h1('Directory Structure') +
	Html.p('Immediately after install the root directory should only contain the node_modules folder. All NWT code is located inside of the node_modules/nwt folder, you should not need to directly access this folder.') +
	Html.h3('Static Resources') +
	Html.p('If you are serving static resources from your NWT installation, we recommend that you place the resources specific to each application inside of that folder. There is no enforced convention, but we recommend placing CSS files inside of nwt/application/css/***.css and images at: nwt/application/img/***.***.')
}