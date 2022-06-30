console.log("hello");

class Musician{
    constructor(name, instrument, influence){
        this.name = name
        this.instrument = instrument;
        this.influence = influence;
    }

    describe() {
        return `${this.name} plays ${this.instrument}, and their biggest influence is ${this.influence}`;
    }

}

class Band {
    constructor(name,genre) {
        this.name = name;
        this.genre = genre;
        this.musicians =[];
        
    }
    addMusician(musician){
        if (musician instanceof Musician){
            this.musicians.push(musician);
        }else{
            throw new Error(`You can only an instance of Musician. Argument is invalid: ${musician}`);
        }
    }

    describe(){
        return `${this.name} has ${this.musicians.length} people in the band. They play ${this.genre} music.`;
    }
}

class Menu{
    constructor(){
        this.bands = [];
        this.selectedBand = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        
        while(selection != 0){
            switch (selection){
                case '1': 
                    this.createBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('See you next time!');
    }

    showMainMenuOptions(){
        return prompt(`
        0)Exit
        1)Start a new band
        2)See who is in a band
        3)Break up a band
        4)See what bands there are
        `);
    }

    showBandMenuOptions(bandInfo) {
        return prompt(`
        0)Back
        1)Hire musician
        2)Fire musician
        ------------------------
        ${bandInfo}
        `);

    }

    displayBands(){
        let bandString = '';
        for (let i = 0; i < this.bands.length; i++) {
            bandString += i + ') ' + this.bands[i].name + '\n';
        }
        alert(bandString);
    } 
    
    createBand(){
        let name = prompt('Enter your new bands name!');
        let genre = prompt('What genre are they?');
        this.bands.push(new Band(name, genre));
    }

    deleteBand(){
        let index = prompt('Which band are you breaking up? (select using index)');
        if (index > -1 && index < this.bands.length ){
            this.bands.splice(index, 1);
        }
    }

    deleteMusician(){
        let index = prompt('Which band member are you firing? (select using index)');
        if (index > -1 && index < this.selectedBand.musicians.length ){
            this.selectedBand.musicians.splice(index, 1);
        }
    }


    createMusician(){
        let name = prompt('Enter the musicians name!');
        let instrument = prompt('What do they play?');
        let influence =prompt('Who is their biggest influence?');
        this.selectedBand.musicians.push(new Musician(name, instrument, influence));
    }


    viewBand(){
        let index = prompt('Enter the index of the band you want to look at.');
        if (index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index];
            let description = 'Band Name: ' + this.selectedBand.name + '\n' +'Genre: ' + this.selectedBand.genre + '\n' +'\n';


            for (let i = 0; i < this.selectedBand.musicians.length; i++) {
                description += i + ') ' + this.selectedBand.musicians[i].name + ' - ' + 
                this.selectedBand.musicians[i].instrument + '\n' + '    Influence: ' + 
                this.selectedBand.musicians[i].influence + '\n' + '\n';
            }

            let selection = this.showBandMenuOptions(description);
            switch(selection){
                case '1':
                    this.createMusician();
                    break;
                case '2':
                    this.deleteMusician();
                    break;
            }
        }
        else{
            alert('Please select a Band by using its index.');
        }
    }
}

let menu = new Menu();
menu.start();