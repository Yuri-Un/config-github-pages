class ConfigFile{
    constructor(){
        //this.root = root === undefined || root.length <= 0 ? '.': root;

        this.root = this.getRootFolder();
        this.path = this.getRelPath();
        this.loaded = false;
    }

    getRootFolder(){
        let dirs = location.pathname.split("/");
        let rootDir = location.origin;

        for (let index = 0; index < dirs.length - 1; index++) {
            if(dirs[index].length > 0){
                rootDir += "/" + dirs[index];            
            }
        }

        console.log(dirs);
        console.log(rootDir);
        return rootDir;
    }

    async getRelPath(){
        let result = '.';
        const configURL = this.root + '/config.json';

        let prom = await fetch(configURL)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw ({'msg': response.status});
            }
        })
        .then(data => data)
        .catch(error => {
            console.log('Configuration file not found (' + error.msg + ')! The module sound effects may be disabled! \nCheck the README documentation at https://github.com/Yuri-Un/minesweeper \n');
        });

        return prom;
    }
}

//Vars
let dir = '.'
const confElem = document.querySelector('.config-file');
const libElem = document.querySelector('.lib-json');
const cssfElem = document.querySelector('.css-images');

//Entry point
const configFile = new ConfigFile();
const relPath = async () => {
    const result = await configFile.path;
    confElem.innerText = JSON.stringify(result);
    libElem.innerText = "." + result.libpath + "/data.json";
    cssfElem.innerHTML = "<img src='" + result.csspath + "/qrcode_www.youtube.com.png' />";

    dir = result;
};

relPath();

setTimeout(() => {
    console.log(dir)
}, 500);