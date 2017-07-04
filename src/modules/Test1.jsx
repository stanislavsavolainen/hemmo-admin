
import React from 'react';


import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';


//kentät
//material-ui component
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

//import RaisedButton from 'material-ui/RaisedButton';

//Continuous sliders
//import Slider from 'material-ui/Slider';
//import Slider from 'material-ui/Slider'; //ei löydy  "Slider" komponenttia material-ui:ssa


//https://material-ui-1dab0.firebaseapp.com/component-demos/selection-controls
import { LabelRadio, RadioGroup } from 'material-ui/Radio';

//komponenttien layout
//import CardWrapper from '../components/CardWrapper';
//import ResponsiveCard from '../components/ResponsiveCard';
//import { CardActions, CardHeader, CardContent } from 'material-ui/Card';

import Card, {
  CardContent,
} from 'material-ui/Card';

import CardGridWrapper from '../components/CardGridWrapper';

//let counter = 0;

class Test1 extends React.Component {

    uusiElementti(indeksi, nimi, arvo, kuvaus) {

        return { id: indeksi, nimi: nimi, arvo: arvo, kuvaus: kuvaus };
    }

    //------------------------------------


    constructor(props) {
        super(props);
        this.state = {
            data: [
                this.uusiElementti(1, "kirja", "500€", "jotain tekstiä"),
                this.uusiElementti(2, "auto", "20000€", "hieno auto"),
                this.uusiElementti(3, "Iphone 5", "180€", "hieman vanhentunut, mutta toimii"),
                this.uusiElementti(4, "talo", "300000€", "ei tietoa ..."),

            ],

            header_data: [{ id: "id" }, { nimi: "nimi" }, { arvo: "arvo" }, { kuvaus: "kuvaus" }],
            kentta_arvo: "",
            tx_radio: "",
            muokkaus: false,
            muokkaus_vain_kerran: false,
            muokkaus_indeksi: 0,
            muokkaus_kentta_arvo: "",
            tietoje_lukumaara_enintaan: 16  //kuinka monta elementtiä voi enintään olla taulukossa
        }
    }

    //------------------------------------

    uusi_tieto() {

        let radio_arvo = this.state.tx_radio;
        if (radio_arvo === "") radio_arvo = "0 €";

        let uusiElementti = this.uusiElementti((this.state.data.length + 1), this.state.kentta_arvo, radio_arvo, "ei tietoa ...");
        this.state.data.push(uusiElementti);
        this.setState(this.state);
    }


    //------------------------------------

    poista_tieto(poisto_indeksi) {
        this.state.data.splice(poisto_indeksi, 1);
        this.setState(this.state);
    }


    //------------------------------------

    muokkaa_tieto(muokkaus_indeksi) {

        this.state.data[muokkaus_indeksi].nimi = this.state.muokkaus_kentta_arvo;
        let radio_arvo = this.state.tx_radio;
        if (radio_arvo === "") radio_arvo = "0 €";
        this.state.data[muokkaus_indeksi].arvo = radio_arvo;
        // this.state.data[muokkaus_indeksi].arvo = "-10 €";

        this.state.muokkaus = false;
        this.state.muokkaus_vain_kerran = false;

        this.setState(this.state);
    }


    //------------------------------------

    tallenna_json_tiedosto() {

        console.log("Tallennus !");
        /*
        var json_merkkijono = JSON.stringify(this.state.data);

        var files = new Blob([json_merkkijono], { type: "text/plain" });

        //tee linkki tiedostoon ---> luo tallennusnimen tiedoston tallentamista varten
        a.href = URL.createObjectURL(files);
        a.download = "tieto.json"  // lue tiedoston nimi
         */
    }


    //------------------------------------

    lataa_json_tiedosto(tiedoston_luku_tapahtuma) {

        console.log("Lataus");

       // this.setState(this.state);
       /*

        var reader = new FileReader();
        reader.onload = () => {

            //json_tyyppi
            var text = reader.result;

            console.log(text);

            this.setState(this.state); //tallentaa muistiin ja päivittää React komponentin näyttön
        }

        //parametrina tiedoston taulukko tekstikentästä, ensimmäinen tiedosto
        reader.readAsText(tiedoston_luku_tapahtuma.target.files[0]);
        */
    }


    //------------------------------------
    render() {

        let solut_tyyli = { backgroundColor: '#708090', fontSize: 18, color: 'blue' }
        let muokkaus_tyyli = { backgroundColor: '#708090', fontSize: 18, color: 'red' }
   
        //--------------- tekstikenttä ------------------------------
        let ui_tekstikentta = (
            <TextField style={{ backgroundColor: 'silver', fontSize: 24 }}
                onChange={(tekstikentta_tapahtuma) => this.state.kentta_arvo = tekstikentta_tapahtuma.target.value} > </TextField>
        );
        //--------------- nappi -------------------------------------
        let ui_nappi = (
            <Button style={{ backgroundColor: 'silver', fontSize: 24, color: 'blue' }} onClick={() => this.uusi_tieto()}  > Uusi elementti </Button>
        );

        // ------------- radio buttons -------------------------------
        let radio_button = (
            <RadioGroup
                selectedValue={this.state.tx_radio}
                onChange={(radio_tapahtuma) => { this.state.tx_radio = radio_tapahtuma.target.value; this.setState(this.state); }}

            >
                <LabelRadio label="0 €" value="0 €" />
                <LabelRadio label="5 €" value="5 €" />
                <LabelRadio label="10 €" value="10 €" />
            </RadioGroup>
        );

        let radio_buttonB = (
            <RadioGroup
                selectedValue={this.state.tx_radio}
                onChange={(radio_tapahtuma) => { this.state.tx_radio = radio_tapahtuma.target.value; this.setState(this.state); }}

            >
                <LabelRadio label="20 €" value="20 €" />
                <LabelRadio label="50 €" value="50 €" />
                <LabelRadio label="100 €" value="100 €" />
            </RadioGroup>
        );

        //------------- material-ui komponentien layout --------------

        let ui_komponentti_layout = "";





        //------------ näyttä muokkaus kenttä ------------------------------
        let ui_muokkaus = null;


        //------------ nappi joka tallentaa JSON tiedoston -----------------

        let ui_nappi_tallenna_json = (<Button style={{ backgroundColor: 'silver', fontSize: 24, color: 'blue' }} onClick={() => this.tallenna_json_tiedosto()} > Tallenna JSON-tiedosto </Button>);

        // esim table elementeillä  <table>  data.map ... <tr><td>1</td><td>2</td> </tr>  </table>



        //------------- nappi joka avaa JSON tiedoston --------------

        //onChange={(tapahtuma) => this.lueTiedosto(tapahtuma)} />

        //let ui_kentta_lukee_json = ( <TextField   style={{ backgroundColor: 'silver' }} onChange={ () => this.lataa_json_tiedosto() } > dasd  </TextField>);

        // let ui_nappi_lukee_json = ( <Button style={{ backgroundColor: 'silver', fontSize: 24, color: 'blue' }} onChange = {(tapahtuma) => this.lataa_json_tiedosto(tapahtuma)} > Avaa JSON </Button>)

        // let ui_nappi_lukee_json = ( <Button> <input type="file" style={{ backgroundColor: 'silver', fontSize: 24, color: 'blue' }} onChange = {(tapahtuma) => this.lataa_json_tiedosto(tapahtuma)} value="Avaa JSON" />  </Button>);

        /*
        let ui_nappi_lukee_json = ( 
        <Button label="Choose file" labelPosition="before">
             <input type="file" style={{ backgroundColor: 'silver', fontSize: 24, color: 'blue' }} onClick = {(tapahtuma) => this.tapahtuma.lataa_json_tiedosto(tapahtuma)} value="Avaa JSON" />
         </Button>
        );
        */
        let ui_nappi_lukee_json = (
            <Button
                containerElement='label' // <-- Just add me!
                label='My Label'
                onClick = { (e) => this.lataa_json_tiedosto(e.target.value)}  //  onClick = { (e) => this.lataa_json_tiedosto() }
                >
                <input type="file"   />
                Lataa JSON
            </Button>
        );


        //---------------- muokkauksen tulostus ---------------------
        if (this.state.muokkaus) {
            if (this.state.muokkaus_vain_kerran) {
                // this.state.muokkaus_vain_kerran = false;
                ui_muokkaus = (
                    <TableRow>
                        <TableCell style={muokkaus_tyyli} > id </TableCell>
                        <TableCell style={muokkaus_tyyli} > <TextField style={{ backgroundColor: 'orange' }} onChange={(muokkaus_muutos_tapahtuma) => this.state.muokkaus_kentta_arvo = muokkaus_muutos_tapahtuma.target.value}> </TextField> </TableCell>
                        <TableCell style={muokkaus_tyyli}>
                            {radio_button} {radio_buttonB}
                        </TableCell>
                        <TableCell style={muokkaus_tyyli}> kuvaus </TableCell>
                        <TableCell> <Button style={muokkaus_tyyli} onClick={() => this.muokkaa_tieto(this.state.muokkaus_indeksi)} > Tallenna solun : {this.state.muokkaus_indeksi} muutos  </Button> </TableCell><TableCell></TableCell>
                    </TableRow>
                );
            } else {
                ui_muokkaus = null;
            }
        }


        //--------------- taulun tulostus ------------------------- 
        let map_taulu = this.state.data.map((elementti, indeksi) => {

            let muokkaus_arvo = null

            //suorittaa poikkeuksen ja lisää ylimääräisen solu rivin muokattun datan jälkeen, mutta ennen seuraava solurivin elementtiä
            if (this.state.muokkaus_vain_kerran && indeksi === this.state.muokkaus_indeksi) {
                muokkaus_arvo = ui_muokkaus;
               // this.state.muokkaus_vain_kerran = false;
            }

            //taulukko jossa 2 arvoa, ensimmäinen on taulukko data ja toinen on poikkeus muokkamista varten (soritetaan vain yhdelle elementille kerralaan)
            let temp_row = [(<TableRow>
                <TableCell style={solut_tyyli} > {indeksi} </TableCell>
                <TableCell style={solut_tyyli} > {elementti.nimi} </TableCell>
                <TableCell style={solut_tyyli}> {elementti.arvo} </TableCell>
                <TableCell style={solut_tyyli}> {elementti.kuvaus} </TableCell>
                <TableCell> <Button style={{ backgroundColor: 'silver', fontSize: 24, color: 'green' }} onClick={() => { this.state.muokkaus = !this.state.muokkaus; this.state.muokkaus_vain_kerran = true; this.state.muokkaus_indeksi = indeksi; this.setState(this.state) }} > Muokkaa </Button> </TableCell>
                <TableCell> <Button style={{ backgroundColor: 'silver', fontSize: 24, color: 'red' }} onClick={() => this.poista_tieto(indeksi)}  > Poista </Button> </TableCell>
            </TableRow>), muokkaus_arvo];

            /*
        return [
            (<TableRow>
                <TableCell style={solut_tyyli} > {elementti.id} </TableCell>
                <TableCell style={solut_tyyli} > {elementti.nimi} </TableCell>
                <TableCell style={solut_tyyli}> {elementti.arvo} </TableCell>
                <TableCell style={solut_tyyli}> {elementti.kuvaus} </TableCell>
                <TableCell> <Button style={{ backgroundColor: 'silver', fontSize: 24, color: 'green' }} onClick={() => { this.state.muokkaus = !this.state.muokkaus; this.state.muokkaus_vain_kerran = true; this.setState(this.state) }} > Muokaa </Button> </TableCell>
                <TableCell> <Button style={{ backgroundColor: 'silver', fontSize: 24, color: 'red' }} onClick={() => this.poista_tieto(indeksi)}  > Poista </Button> </TableCell>
            </TableRow>),
            ui_muokkaus
        ]
        */

            return temp_row;
        });




        let koko_taulu = (<Table><TableBody>{map_taulu}</TableBody></Table>);


        //-------------------------- card_warapperit ----------------

        //   <ResponsiveCard style={{ maxWidth: 360 }}>
        //   </ResponsiveCard> 

        //laske datan määrä
        if (this.state.data.length < this.state.tietoje_lukumaara_enintaan) {
       
       
            ui_komponentti_layout = (<div></div>);
       
            /*
             <CardContent
                            title="CardWrapper - CardContent layout"
                            subhead="Anna uusi tieto :"
                        />
                        */
      
            ui_komponentti_layout = (
                <div>
                    <CardGridWrapper>
                       
                       
                        <CardContent></CardContent>
                    </CardGridWrapper>


                    <CardGridWrapper>
                        <CardContent> Otsikko teksti : </CardContent> <CardContent> {ui_tekstikentta} </CardContent>
                    </CardGridWrapper>


                    <CardGridWrapper>
                        <CardContent> Hinta : </CardContent>
                        <CardContent>  {radio_button}  </CardContent>
                        <CardContent> {radio_buttonB} </CardContent>
                    </CardGridWrapper>

                    <CardGridWrapper>
                        <CardContent>  {ui_nappi} </CardContent>
                    </CardGridWrapper>
                </div>
            );
            
    
         }
        else {
            ui_komponentti_layout = <div> <p style={{ backgroundColor: 'silver', fontSize: 24, color: 'blue' }} > Ei voi lisätä enempää, liian paljon dataa </p></div>;
        }


        ///{ui_nappi_lukee_json} 

        return <div> {ui_nappi_tallenna_json} {ui_nappi_lukee_json}  <br /> <div> <a href="#" id="a"> Tallenna data </a> </div> <br /> <br /> {koko_taulu} {ui_komponentti_layout} </div>;

        //return <div> 123 </div>;


    }//render

}

export default Test1;

