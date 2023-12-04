import Navbar from "../components/Misc/Navbar";
import Footer from "../components/Misc/Footer";


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateUser() {


    return (
        <div>
            <Navbar />

            <div className="w-1/2 mx-auto mt-[10rem] flex flex-col gap-[1rem]">

                <div className="text-left">


                    <p style={{display: 'block'}}><strong>General conditions of service and use of the site</strong></p>

                    <p style={{display: 'block'}}><strong>Premises</strong></p>

                    <p style={{display: 'block'}}>These general conditions of service and use of the site (hereinafter "General Conditions") govern (i) the booking and purchase - via the web platform, accessible from the sites <a href="http://www.takemihome.it/"><em>www.takemihome.it</em></a> and <a href="http://www.takemihome.com/" ><em>www.takemihome.com</em></a> (of hereinafter jointly referred to as the “Site”) of which the company Take Mi Home Srl the “Company” is the owner, by email to the email address <a href="mailto:info@takemihome.it" ><em>info@takemihome.it</em></a>, as well as by phone call or sending Whatsapp messages at the number +39 3338131426 – of the services offered by third parties (“Services”), (ii) the sale of <em>gift cards</em>, goods or services offered directly by the Company, (iii) as well as the use of the Site.</p>

                    <p style={{display: 'block'}}>To customers who also qualify as consumers pursuant to Legislative Decree no. 206/2005 and subsequent amendments and additions (hereinafter, "Consumer Code"), articles 49 to 67, Chapter I, Title III, Part III of the Consumer Code also apply.</p>

                    <p style={{display: 'block'}}><strong>Definitions</strong></p>

                    <p style={{display: 'block'}}><strong>"Customer":</strong> whether singular or plural, means any natural or legal person who (i) completes the registration process on the Site by creating a personal account in order to purchase the Services and <em>gift cards</em> or goods and services therein offered, (ii) carry out any activity on the Site as a guest without registering, or (iii) contact the Company via email, phone call or Whatsapp messages;</p>

                    <p style={{display: 'block'}}><strong>"Payment Confirmation":</strong> means the email or Whatsapp message sent to the Customer by the Company to confirm the purchase of the chosen Service or the good or service sold by the Company;</p>

                    <p style={{display: 'block'}}>“<strong>Platform</strong>”: means the web platform accessible from the Site owned by the Company;</p>

                    <p style={{display: 'block'}}>"<strong>Professional</strong>": means any natural and/or legal person who, once registered on the Site, professionally provides one of the Services that can be purchased by Customers;</p>

                    <p style={{display: 'block'}}><strong>"Service":</strong> <strong>means</strong> the body care, beauty, wellness and <em>personal training</em>, <em>comfort and experience</em> services offered at home by Professionals to Customers, which can be purchased by them via the Site;</p>

                    <p style={{display: 'block'}}><strong>"Company":</strong> means the company Take Mi Home Srl, with registered office in Via Giovanni Battista Morgagni 28 – 20129 (Milan), registration number in the Company Register of Milan: MI – 2590078, VAT number: 11253120965, the which owns and operates the Site;</p>

                    <p style={{display: 'block'}}><strong>“Site”:</strong> means both the website <a href="http://www.takemihome.it/" ><em>www.takemihome.it</em></a> and the website <a href="http://www.takemihome.com/" ><em>www.takemihome.com</em></a> and/or any application for PCs, smartphones or tablets owned by the Company;</p>





                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Acceptance of the General Conditions</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>In order to book and purchase the Services via the Site, by phone call, email, or via Whatsapp, Customers must carefully read and accept these General Conditions before finalizing each booking and purchase.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Description of the Platform made available with the Site</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>Through the Site, the Company makes available to Customers and Professionals the Platform where supply and demand can meet for the booking and purchase of the Services offered by Professionals. Furthermore, through the Site, it is possible to purchase <em>gift cards</em> or goods and services sold directly by the Company.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}><strong>Therefore, through the Site the Customer will be able</strong> to book and purchase one or more Services made available on the Site by the Professionals and/or purchase <em>gift cards</em> or goods and services offered by the Company.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Relationship between the Company and the Customer</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>The Client acknowledges and accepts that the Company is not part of the professional relationship between the Professional and the Client, and that this professional relationship takes place exclusively between the Client and the chosen Professional, in compliance with the conditions established from time to time between the same parties. The Company is, therefore, responsible only for making the Platform accessible through the Site available and for its maintenance.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Company is extraneous to the relationship between Customers and Professionals. Any terms additional to these General Conditions may apply to the relationship with reference to the Services.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>It is understood that under no circumstances can the Company be held responsible with reference to the quality, characteristics, and/or availability of the Services provided by the Professionals.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong><strong>Registration</strong></strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>In order to book and purchase Services on the Site and/or purchase <em>gift cards</em> or goods and services sold by the Company, Customers must register on the Site by creating a personal <em>account</em> for which they must provide, truthfully and completely, all the data requested in the relevant <em>form</em> and fully accept the Privacy Policy and these General Conditions.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Customer is required to safeguard and keep confidential the credentials for accessing his/her personal account. It is understood that under no circumstances can the Company be held responsible in the event of loss, diffusion, theft, or unauthorized use by third parties, for any reason, of the access credentials to the Customers' personal accounts.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Deactivation, cancellation, and closure of the Customer's account</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>Registered Customers can deactivate their personal accounts, request their cancellation, or stop using the Platform made available on the Site at any time, by contacting the Company directly in accordance with the provisions of article 21 below.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>In case of violation of these General Conditions, the Company reserves the right to suspend or close <em>the Customer's account</em> at any time and without notice.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Company reserves the right to suspend or cancel the Customer's account at any time and without notice if it believes that:</p>

                                    <ul>
                                        <li>
                                            <p style={{display: 'block'}}>access or use of the <em>account</em> to purchase a Service could cause damage to the Company, other Customers, Professionals, or third parties; and/or</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>the use of the Site by the Customer may be in violation of applicable laws or regulations; and/or</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>in the case of investigations conducted following legal actions or involving any competent authority; and/or</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>the <em>account</em> is deemed by the Company, in its sole discretion and for any reason, to be inappropriate or offensive or not in compliance with the Company's standards.</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>In no case can the closure or suspension of the Customer's account by the Company constitute the basis for any request for compensation or compensation claim by the Customer.</p>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>In no case can the closure or suspension of the Customer's account by the Company constitute the basis for any request for compensation or compensation claim by the Customer.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>



                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Contents on the Site and intellectual property rights</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>The contents available on the Site, such as but not limited to: photographs, images, audiovisual contents, audio contents, articles, illustrations, elements which may or may not be protected under current intellectual property regulations (" Contents ") can be enjoyed and used by Customers exclusively within the limits specified in this clause. The Company grants the Customer, for the entire duration of the Contract, a personal, non-transferable and non-exclusive license to use and enjoy such Content for exclusive personal and never commercial purposes and limited to the device used by the Customer. Therefore, the Customer is expressly prohibited from copying and/or downloading and/or sharing (except within the limits illustrated below), modifying, publishing, transmitting, selling, sub-licensing, processing, transferring/assigning to third parties or creating works derived in any way from the Contents, including those of third parties, available on the Site, nor allow third parties to do so via the Customer or his device.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Customer acknowledges that the registered and unregistered trademarks “Take Mi Home” and any denomination deriving therefrom, the format and graphic interface of the Site and the Contents are the exclusive property of the Company; and recognizes that all other distinctive signs, commercial names, service marks, word marks, commercial names, illustrations, images, logos relating to third parties and the contents published by such third parties on the Site are and remain the exclusive property or availability of said third parties. third parties and are protected by current laws and relevant international treaties.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Content provided by Professionals and third parties</strong></p>

                            <ol >
                                <li>
                                    <p style={{display: 'block'}}>The Company does not carry out any moderation and/or preventive control on the contents or links provided by Professionals and third parties shown on the Site. Therefore, the Company declines any responsibility regarding such Contents and their accessibility.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Company specifies that by using an outgoing link from the Site to visit another site, this contract and the Privacy Policy referred to in the following article 17.2 will no longer be applicable. Browsing and interactions with other websites, including those linked to the Site, are subject to different terms of use specific to those sites. Before visiting such sites, the Customer is invited to inform himself about these terms of use.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Uses not permitted</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>The use of the Site by the Customer is subject to compliance with these General Conditions.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>Furthermore, Customers are not allowed:</p>

                                    <ol >
                                        <li>
                                            <p style={{display: 'block'}}>reverse engineer, decompile, disassemble, modify or create derivative works based on the Site, its Content, the Platform made available by the Company, or any portion thereof (including their respective codes);</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>circumvent the computer systems used by the Company or its licensors to protect the content accessible through the Site;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>copy, store, or alter in any way any of the content provided by the Company on the Site;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>use any robot, spider, site search and/or retrieval application, or any other automatic device, process or means to access, retrieve, scrape or index any portion of the Site, its contents, and/or the Platform rendered available from the Company;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>rent, license or sublicense the Site;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>defame, abuse, harass, threaten, threaten or otherwise violate the rights of others;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>disseminate or publish illegal, obscene, illegitimate, defamatory or inappropriate content;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>illicitly take possession of the account used by another Customer;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>use the Site in any other improper way that violates these General Conditions.</p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Withdrawal and termination</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>The Customer may withdraw from these General Conditions at any time, without prejudice to the provisions of the following art. 13. With the termination of the relationship, the Customers remain contractually obliged to pay the Company all the sums accrued and to be accrued for the Services provided and booked to be provided, unless canceled pursuant to the following article 12.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>In no case will the exercise of the right of withdrawal by the Customer constitute an entitlement to request compensation or compensation of any kind, type and for any reason, unless otherwise provided by applicable provisions of law.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>Furthermore, the Customer acknowledges and accepts that the termination of this contract entails the automatic cancellation of the personal account registered on the Site within 60 days. Furthermore, the personal account may be canceled at the Customer's simple request, at any time, for reasons related to the protection of their personal data.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Company reserves the right to withdraw from these General Conditions at any time without notice and without any justification, communicating the cancellation of the account to the Customer via email.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>Furthermore, the Company may terminate the relationship with the Customer in the event of violation of these General Conditions by the Customer, or in the event that the latter has carried out acts and conduct detrimental to the image and reputation of the Site and the Company, without prejudice to requesting compensation from the Customer for greater damages.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>





                    <ol>
                        <li>
                            <p style={{display: 'block'}}>Limitations of Liability</p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>The Company is not responsible for any matter between Clients and Professionals. The Professional will be solely responsible towards the Client for the Service offered.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Customer, therefore, accepts that he will not make any claims against the Company, including economic ones and/or requests for reimbursement deriving from events and circumstances attributable to the Professional's activity. The Customer accepts that he will not make claims and/or requests for reimbursement against the Company for any defects connected to the Services and any activity carried out by the Professional.&nbsp;</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Platform and all the features accessible through the Site are made available to Customers, as provided in these General Conditions, without any guarantee, explicit or implicit, that is not mandatory by law. In particular, no guarantee is provided as to the suitability of the Platform, the Site, the Services and/or the goods and services sold therein for the particular purposes intended by the Customer.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The use of the Site and the functions accessible therein is carried out by the Customers, at their own risk and under their own responsibility and in the presence of a situation that requires the provision of the Services at home.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>The Customer undertakes not to discriminate and/or denigrate third parties, Professionals and other Customers through the Site.  In any case, the Company will not be responsible for damage to the image caused by the Customer to third parties or to the Professional, loss of data, or any indirect, accidental and consequential damage to the purchase of Services or use of the Site.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>Therefore, the Company will not be responsible for:</p>

                                    <ol>
                                        <li>
                                            <p style={{display: 'block'}}>any economic losses that are not a direct consequence of the violation of these General Conditions by the Company;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>ogni perdita di opportunità commerciale e qualsiasi altra perdita, anche indiretta, eventualmente subita dal Cliente in connessione con l’acquisto di un Servizio e/o con la fruizione o la mancata fruizione di un Servizio per qualsivoglia ragione;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>danni o perdite derivanti da interruzioni o malfunzionamenti del Sito dovuti ad eventi di forza maggiore o, comunque, ad eventi imprevisti ed imprevedibili e, comunque, indipendenti dalla volontà ed estranei alla sfera di controllo della Società quali, a titolo esemplificativo e non esaustivo, guasti o interruzioni alle linee telefoniche o elettriche, alla rete internet e/o comunque ad altri strumenti di trasmissione, indisponibilità di siti web, scioperi, eventi naturali, pandemie ed emergenze sanitarie locali oppure nazionali e internazionali, provvedimenti dell’autorità giudiziaria, leggi e provvedimenti governativi nonché regionali e locali, attacchi informatici, interruzioni nell'erogazione di prodotti, servizi o applicazioni di terze parti ed errato o inidoneo utilizzo di takemihome.it da parte degli Clienti o di terzi;</p>
                                        </li>
                                        <li>
                                            <p style={{display: 'block'}}>danni fisici e/o morali subìti dal Cliente a causa di condotte poste in essere da altri Clienti, Professionisti e/o da terzi.</p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Interruzione dellaccessibilità al Sito</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>La Società si riserva il diritto di aggiungere, rimuovere funzionalità o caratteristiche ovvero sospendere o interrompere del tutto la fornitura della Piattaforma o l’accessibilità del Sito, sia in via temporanea che definitiva. In caso di interruzione definitiva, la Società agirà come possibile per permettere ai Clienti di prelevare le proprie informazioni ospitate presso la Società.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}><strong>Privacy Policy</strong></p>

                                    <p style={{display: 'block'}}>Per informazioni sull'utilizzo dei dati personali, ai Clienti devono fare riferimento alla privacy policy della Società, che si trova al seguente link: <a href="https://www.takemihome.it/it/privacy-policy">PRIVACY POLICY</a></p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Requisiti di età</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>I Clienti dichiarano di essere maggiorenni secondo la legislazione italiana. I minorenni non possono utilizzare il Sito.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Modifiche alle presenti Condizioni Generali</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>La Società si riserva il diritto di apportare modifiche alle presenti Condizioni Generali in qualunque momento, dandone avviso ai Clienti mediante pubblicazione all'interno del Sito. Il Cliente che continui ad utilizzare il Sito successivamente alla pubblicazione delle modifiche, accetta senza riserva le modifiche apportate alle Condizioni generali.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong>Cessione del presente contratto</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>La Società si riserva il diritto di trasferire, cedere, disporre per novazione o subappaltare tutti o alcuni dei diritti o obblighi derivanti dalle presenti Condizioni Generali, purché i diritti del Cliente qui previsti non siano pregiudicati. Il Cliente non potrà cedere o trasferire in alcun modo i propri diritti o obblighi ai sensi delle presenti Condizioni Generali senza l'autorizzazione scritta della Società.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <p style={{display: 'block'}}><strong>Comunicazioni</strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>Tutte le comunicazioni relative allutilizzo del Sito e alla fruizione dei Servizi devono essere inviate utilizzando le informazioni di contatto indicate nelle presenti Condizioni Generali e sul Sito.</p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>La Società è disponibile a rispondere ad ogni quesito inoltrato via e-mail al seguente indirizzo di posta elettronica: &nbsp;<strong><em><a href="mailto:info@takemihome.it" >info@takemihome.it</a></em>.</strong></p>
                                </li>
                                <li>
                                    <p style={{display: 'block'}}>Per la prenotazione dei Servizi è inoltre possibile contattare la Società mediante telefonata o via Whatsapp al numero +39 3338131426, via e-mail al predetto indirizzo di posta elettronica.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong><strong>Inefficacia e nullità parziale</strong></strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>Qualora una qualsiasi clausola delle presenti Condizioni Generali dovesse risultare nulla, non valida o inefficace, la suddetta clausola sarà eliminata mentre le restanti clausole non saranno da ciò impattate e rimarranno pienamente valide ed efficaci.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong><strong>Legge applicabile e foro competente </strong></strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>Le presenti Condizioni Generali e tutte le controversie in merito ad esecuzione, interpretazione e validità del presente contratto sono regolate dalla legge italiana. Il foro competente sarà quello di Milano. Fa eccezione il foro esclusivo di residenza o domicilio del consumatore, secondo quanto previsto dalla normativa applicabile (e in particolare dal Codice del Consumo).</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong><strong>Risoluzione delle controversie</strong></strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>Il consumatore residente in uno Stato membro dell’Unione europea può utilizzare la piattaforma online istituita dalla Commissione Europea per fornire uno strumento di risoluzione alternativa delle controversie. Tale strumento può essere utilizzato dal consumatore europeo per risolvere in via non giudiziale ogni controversia relativa a e/o derivante da contratti di vendita di beni e servizi stipulati in rete. Di conseguenza, se sei un consumatore europeo, puoi usare tale piattaforma per la risoluzione di ogni disputa nascente dal contratto online stipulato con la Società. La piattaforma è disponibile al seguente link</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <p style={{display: 'block'}}><strong><a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage" >https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage</a></strong></p>

                    <ol>
                        <li>
                            <p style={{display: 'block'}}><strong><strong>Clausole soggette a specifica approvazione ai sensi degli artt. 1341 e 1342 del codice civile </strong></strong></p>

                            <ol>
                                <li>
                                    <p style={{display: 'block'}}>Ai sensi degli artt. 1341 e 1342 del codice civile, il Cliente accetta espressamente le seguenti clausole: 10 (<strong>Procedura di prenotazione e acquisto dei Servizi – espressa richiesta di inizio dell’esecuzione della prestazione</strong>), 12 (<strong>Cancellazione e modifica dei Servizi prenotati. Ritardi e cancellazione da parte del professionista</strong>), 16 (<strong>Limitazioni di responsabilità</strong>), 17 (<strong>Interruzione dell’accessibilità al Sito</strong>), 19 (<strong>Modifiche alle presenti Condizioni generali</strong>).</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <p style={{display: 'block'}}>Le presenti Condizioni Generali sono state aggiornate l’ultima volta in data 6 Ottobre 2021.</p>
                </div>


            </div>

            <Footer />
        </div>
    );
}

export default CreateUser;