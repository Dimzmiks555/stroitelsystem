'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApplicationsModule.html" data-type="entity-link" >ApplicationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ApplicationsModule-b381235b95722bd2ea98fa2c0c42eb5b52f3aa990f44ca8f1ff23ef3e453e0fcfa7318ce6fe99ec39ddb0ef1e3032bb430d5b0e802fafe1e13366075061ba119"' : 'data-target="#xs-controllers-links-module-ApplicationsModule-b381235b95722bd2ea98fa2c0c42eb5b52f3aa990f44ca8f1ff23ef3e453e0fcfa7318ce6fe99ec39ddb0ef1e3032bb430d5b0e802fafe1e13366075061ba119"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApplicationsModule-b381235b95722bd2ea98fa2c0c42eb5b52f3aa990f44ca8f1ff23ef3e453e0fcfa7318ce6fe99ec39ddb0ef1e3032bb430d5b0e802fafe1e13366075061ba119"' :
                                            'id="xs-controllers-links-module-ApplicationsModule-b381235b95722bd2ea98fa2c0c42eb5b52f3aa990f44ca8f1ff23ef3e453e0fcfa7318ce6fe99ec39ddb0ef1e3032bb430d5b0e802fafe1e13366075061ba119"' }>
                                            <li class="link">
                                                <a href="controllers/ApplicationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplicationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApplicationsModule-b381235b95722bd2ea98fa2c0c42eb5b52f3aa990f44ca8f1ff23ef3e453e0fcfa7318ce6fe99ec39ddb0ef1e3032bb430d5b0e802fafe1e13366075061ba119"' : 'data-target="#xs-injectables-links-module-ApplicationsModule-b381235b95722bd2ea98fa2c0c42eb5b52f3aa990f44ca8f1ff23ef3e453e0fcfa7318ce6fe99ec39ddb0ef1e3032bb430d5b0e802fafe1e13366075061ba119"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApplicationsModule-b381235b95722bd2ea98fa2c0c42eb5b52f3aa990f44ca8f1ff23ef3e453e0fcfa7318ce6fe99ec39ddb0ef1e3032bb430d5b0e802fafe1e13366075061ba119"' :
                                        'id="xs-injectables-links-module-ApplicationsModule-b381235b95722bd2ea98fa2c0c42eb5b52f3aa990f44ca8f1ff23ef3e453e0fcfa7318ce6fe99ec39ddb0ef1e3032bb430d5b0e802fafe1e13366075061ba119"' }>
                                        <li class="link">
                                            <a href="injectables/ApplicationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplicationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-21af47218288894714c9a189d2960e72e968959a17fc0715ee3598695f2ea5eeb7e1f2f1f3d7445239df18ab7531b87253834ebe5194fcde353e921fa165ddd8"' : 'data-target="#xs-controllers-links-module-AppModule-21af47218288894714c9a189d2960e72e968959a17fc0715ee3598695f2ea5eeb7e1f2f1f3d7445239df18ab7531b87253834ebe5194fcde353e921fa165ddd8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-21af47218288894714c9a189d2960e72e968959a17fc0715ee3598695f2ea5eeb7e1f2f1f3d7445239df18ab7531b87253834ebe5194fcde353e921fa165ddd8"' :
                                            'id="xs-controllers-links-module-AppModule-21af47218288894714c9a189d2960e72e968959a17fc0715ee3598695f2ea5eeb7e1f2f1f3d7445239df18ab7531b87253834ebe5194fcde353e921fa165ddd8"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-21af47218288894714c9a189d2960e72e968959a17fc0715ee3598695f2ea5eeb7e1f2f1f3d7445239df18ab7531b87253834ebe5194fcde353e921fa165ddd8"' : 'data-target="#xs-injectables-links-module-AppModule-21af47218288894714c9a189d2960e72e968959a17fc0715ee3598695f2ea5eeb7e1f2f1f3d7445239df18ab7531b87253834ebe5194fcde353e921fa165ddd8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-21af47218288894714c9a189d2960e72e968959a17fc0715ee3598695f2ea5eeb7e1f2f1f3d7445239df18ab7531b87253834ebe5194fcde353e921fa165ddd8"' :
                                        'id="xs-injectables-links-module-AppModule-21af47218288894714c9a189d2960e72e968959a17fc0715ee3598695f2ea5eeb7e1f2f1f3d7445239df18ab7531b87253834ebe5194fcde353e921fa165ddd8"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckoutsModule.html" data-type="entity-link" >CheckoutsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CheckoutsModule-54455bafd8dd2b08f467eb9e8e670d18487c025563dbf88de639f41385eedec657d9db8e8da6c576e9a12e5aa2a8b36abe5f382da9218c6359d46ae97cacf8f8"' : 'data-target="#xs-controllers-links-module-CheckoutsModule-54455bafd8dd2b08f467eb9e8e670d18487c025563dbf88de639f41385eedec657d9db8e8da6c576e9a12e5aa2a8b36abe5f382da9218c6359d46ae97cacf8f8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CheckoutsModule-54455bafd8dd2b08f467eb9e8e670d18487c025563dbf88de639f41385eedec657d9db8e8da6c576e9a12e5aa2a8b36abe5f382da9218c6359d46ae97cacf8f8"' :
                                            'id="xs-controllers-links-module-CheckoutsModule-54455bafd8dd2b08f467eb9e8e670d18487c025563dbf88de639f41385eedec657d9db8e8da6c576e9a12e5aa2a8b36abe5f382da9218c6359d46ae97cacf8f8"' }>
                                            <li class="link">
                                                <a href="controllers/CheckoutsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CheckoutsModule-54455bafd8dd2b08f467eb9e8e670d18487c025563dbf88de639f41385eedec657d9db8e8da6c576e9a12e5aa2a8b36abe5f382da9218c6359d46ae97cacf8f8"' : 'data-target="#xs-injectables-links-module-CheckoutsModule-54455bafd8dd2b08f467eb9e8e670d18487c025563dbf88de639f41385eedec657d9db8e8da6c576e9a12e5aa2a8b36abe5f382da9218c6359d46ae97cacf8f8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CheckoutsModule-54455bafd8dd2b08f467eb9e8e670d18487c025563dbf88de639f41385eedec657d9db8e8da6c576e9a12e5aa2a8b36abe5f382da9218c6359d46ae97cacf8f8"' :
                                        'id="xs-injectables-links-module-CheckoutsModule-54455bafd8dd2b08f467eb9e8e670d18487c025563dbf88de639f41385eedec657d9db8e8da6c576e9a12e5aa2a8b36abe5f382da9218c6359d46ae97cacf8f8"' }>
                                        <li class="link">
                                            <a href="injectables/CheckoutsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckoutsProductsModule.html" data-type="entity-link" >CheckoutsProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CheckoutsProductsModule-3a8b1ff1c903fb26308e522b556bf56fd2d69b837f17d65e9d8d51fa5fc687bc6119b908d99fa910085c3de44a01e897aa54363d3dded0be0718bf2581b6c7bc"' : 'data-target="#xs-controllers-links-module-CheckoutsProductsModule-3a8b1ff1c903fb26308e522b556bf56fd2d69b837f17d65e9d8d51fa5fc687bc6119b908d99fa910085c3de44a01e897aa54363d3dded0be0718bf2581b6c7bc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CheckoutsProductsModule-3a8b1ff1c903fb26308e522b556bf56fd2d69b837f17d65e9d8d51fa5fc687bc6119b908d99fa910085c3de44a01e897aa54363d3dded0be0718bf2581b6c7bc"' :
                                            'id="xs-controllers-links-module-CheckoutsProductsModule-3a8b1ff1c903fb26308e522b556bf56fd2d69b837f17d65e9d8d51fa5fc687bc6119b908d99fa910085c3de44a01e897aa54363d3dded0be0718bf2581b6c7bc"' }>
                                            <li class="link">
                                                <a href="controllers/CheckoutsProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutsProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CheckoutsProductsModule-3a8b1ff1c903fb26308e522b556bf56fd2d69b837f17d65e9d8d51fa5fc687bc6119b908d99fa910085c3de44a01e897aa54363d3dded0be0718bf2581b6c7bc"' : 'data-target="#xs-injectables-links-module-CheckoutsProductsModule-3a8b1ff1c903fb26308e522b556bf56fd2d69b837f17d65e9d8d51fa5fc687bc6119b908d99fa910085c3de44a01e897aa54363d3dded0be0718bf2581b6c7bc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CheckoutsProductsModule-3a8b1ff1c903fb26308e522b556bf56fd2d69b837f17d65e9d8d51fa5fc687bc6119b908d99fa910085c3de44a01e897aa54363d3dded0be0718bf2581b6c7bc"' :
                                        'id="xs-injectables-links-module-CheckoutsProductsModule-3a8b1ff1c903fb26308e522b556bf56fd2d69b837f17d65e9d8d51fa5fc687bc6119b908d99fa910085c3de44a01e897aa54363d3dded0be0718bf2581b6c7bc"' }>
                                        <li class="link">
                                            <a href="injectables/CheckoutsProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutsProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContragentsModule.html" data-type="entity-link" >ContragentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ContragentsModule-334f0f201c4881dd819ef8893a186017b8f433c8d2fec7c677e82c2eae7c16c583751c38a75e9f77fa851e8a3187104b95388270c87c815224585ffdfbd74a0d"' : 'data-target="#xs-controllers-links-module-ContragentsModule-334f0f201c4881dd819ef8893a186017b8f433c8d2fec7c677e82c2eae7c16c583751c38a75e9f77fa851e8a3187104b95388270c87c815224585ffdfbd74a0d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContragentsModule-334f0f201c4881dd819ef8893a186017b8f433c8d2fec7c677e82c2eae7c16c583751c38a75e9f77fa851e8a3187104b95388270c87c815224585ffdfbd74a0d"' :
                                            'id="xs-controllers-links-module-ContragentsModule-334f0f201c4881dd819ef8893a186017b8f433c8d2fec7c677e82c2eae7c16c583751c38a75e9f77fa851e8a3187104b95388270c87c815224585ffdfbd74a0d"' }>
                                            <li class="link">
                                                <a href="controllers/ContragentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContragentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ContragentsModule-334f0f201c4881dd819ef8893a186017b8f433c8d2fec7c677e82c2eae7c16c583751c38a75e9f77fa851e8a3187104b95388270c87c815224585ffdfbd74a0d"' : 'data-target="#xs-injectables-links-module-ContragentsModule-334f0f201c4881dd819ef8893a186017b8f433c8d2fec7c677e82c2eae7c16c583751c38a75e9f77fa851e8a3187104b95388270c87c815224585ffdfbd74a0d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContragentsModule-334f0f201c4881dd819ef8893a186017b8f433c8d2fec7c677e82c2eae7c16c583751c38a75e9f77fa851e8a3187104b95388270c87c815224585ffdfbd74a0d"' :
                                        'id="xs-injectables-links-module-ContragentsModule-334f0f201c4881dd819ef8893a186017b8f433c8d2fec7c677e82c2eae7c16c583751c38a75e9f77fa851e8a3187104b95388270c87c815224585ffdfbd74a0d"' }>
                                        <li class="link">
                                            <a href="injectables/ContragentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContragentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentModule.html" data-type="entity-link" >DocumentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DocumentModule-d64139af91a3914f30aaafb763d0761989aa2a9fce10fc9de43fa00a138b28442593afdc7b0cf7ce806c3441f92be206d1e56f4906daddc4682a10ee9846a578"' : 'data-target="#xs-controllers-links-module-DocumentModule-d64139af91a3914f30aaafb763d0761989aa2a9fce10fc9de43fa00a138b28442593afdc7b0cf7ce806c3441f92be206d1e56f4906daddc4682a10ee9846a578"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DocumentModule-d64139af91a3914f30aaafb763d0761989aa2a9fce10fc9de43fa00a138b28442593afdc7b0cf7ce806c3441f92be206d1e56f4906daddc4682a10ee9846a578"' :
                                            'id="xs-controllers-links-module-DocumentModule-d64139af91a3914f30aaafb763d0761989aa2a9fce10fc9de43fa00a138b28442593afdc7b0cf7ce806c3441f92be206d1e56f4906daddc4682a10ee9846a578"' }>
                                            <li class="link">
                                                <a href="controllers/DocumentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DocumentModule-d64139af91a3914f30aaafb763d0761989aa2a9fce10fc9de43fa00a138b28442593afdc7b0cf7ce806c3441f92be206d1e56f4906daddc4682a10ee9846a578"' : 'data-target="#xs-injectables-links-module-DocumentModule-d64139af91a3914f30aaafb763d0761989aa2a9fce10fc9de43fa00a138b28442593afdc7b0cf7ce806c3441f92be206d1e56f4906daddc4682a10ee9846a578"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DocumentModule-d64139af91a3914f30aaafb763d0761989aa2a9fce10fc9de43fa00a138b28442593afdc7b0cf7ce806c3441f92be206d1e56f4906daddc4682a10ee9846a578"' :
                                        'id="xs-injectables-links-module-DocumentModule-d64139af91a3914f30aaafb763d0761989aa2a9fce10fc9de43fa00a138b28442593afdc7b0cf7ce806c3441f92be206d1e56f4906daddc4682a10ee9846a578"' }>
                                        <li class="link">
                                            <a href="injectables/DocumentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NomenklaturaModule.html" data-type="entity-link" >NomenklaturaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NomenklaturaModule-b72bd94a767e27c99fae97b5327825e389b2eb98643ab8e92a8db4e0501572977921b82170af834ddab34258fb79a69fa3ca02b792cd20d46c4490a025032910"' : 'data-target="#xs-controllers-links-module-NomenklaturaModule-b72bd94a767e27c99fae97b5327825e389b2eb98643ab8e92a8db4e0501572977921b82170af834ddab34258fb79a69fa3ca02b792cd20d46c4490a025032910"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NomenklaturaModule-b72bd94a767e27c99fae97b5327825e389b2eb98643ab8e92a8db4e0501572977921b82170af834ddab34258fb79a69fa3ca02b792cd20d46c4490a025032910"' :
                                            'id="xs-controllers-links-module-NomenklaturaModule-b72bd94a767e27c99fae97b5327825e389b2eb98643ab8e92a8db4e0501572977921b82170af834ddab34258fb79a69fa3ca02b792cd20d46c4490a025032910"' }>
                                            <li class="link">
                                                <a href="controllers/NomenklaturaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NomenklaturaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NomenklaturaModule-b72bd94a767e27c99fae97b5327825e389b2eb98643ab8e92a8db4e0501572977921b82170af834ddab34258fb79a69fa3ca02b792cd20d46c4490a025032910"' : 'data-target="#xs-injectables-links-module-NomenklaturaModule-b72bd94a767e27c99fae97b5327825e389b2eb98643ab8e92a8db4e0501572977921b82170af834ddab34258fb79a69fa3ca02b792cd20d46c4490a025032910"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NomenklaturaModule-b72bd94a767e27c99fae97b5327825e389b2eb98643ab8e92a8db4e0501572977921b82170af834ddab34258fb79a69fa3ca02b792cd20d46c4490a025032910"' :
                                        'id="xs-injectables-links-module-NomenklaturaModule-b72bd94a767e27c99fae97b5327825e389b2eb98643ab8e92a8db4e0501572977921b82170af834ddab34258fb79a69fa3ca02b792cd20d46c4490a025032910"' }>
                                        <li class="link">
                                            <a href="injectables/NomenklaturaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NomenklaturaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NoteProductsModule.html" data-type="entity-link" >NoteProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NoteProductsModule-d8910b11455529ae7282be11c6edea5460c8a560bf2f245ed6217e0bf3427f8798948f6e134ff3f301ac6dc42ee7ce2037f7d746eb084aa3c54f232616b0b3cb"' : 'data-target="#xs-controllers-links-module-NoteProductsModule-d8910b11455529ae7282be11c6edea5460c8a560bf2f245ed6217e0bf3427f8798948f6e134ff3f301ac6dc42ee7ce2037f7d746eb084aa3c54f232616b0b3cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NoteProductsModule-d8910b11455529ae7282be11c6edea5460c8a560bf2f245ed6217e0bf3427f8798948f6e134ff3f301ac6dc42ee7ce2037f7d746eb084aa3c54f232616b0b3cb"' :
                                            'id="xs-controllers-links-module-NoteProductsModule-d8910b11455529ae7282be11c6edea5460c8a560bf2f245ed6217e0bf3427f8798948f6e134ff3f301ac6dc42ee7ce2037f7d746eb084aa3c54f232616b0b3cb"' }>
                                            <li class="link">
                                                <a href="controllers/NoteProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoteProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NoteProductsModule-d8910b11455529ae7282be11c6edea5460c8a560bf2f245ed6217e0bf3427f8798948f6e134ff3f301ac6dc42ee7ce2037f7d746eb084aa3c54f232616b0b3cb"' : 'data-target="#xs-injectables-links-module-NoteProductsModule-d8910b11455529ae7282be11c6edea5460c8a560bf2f245ed6217e0bf3427f8798948f6e134ff3f301ac6dc42ee7ce2037f7d746eb084aa3c54f232616b0b3cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NoteProductsModule-d8910b11455529ae7282be11c6edea5460c8a560bf2f245ed6217e0bf3427f8798948f6e134ff3f301ac6dc42ee7ce2037f7d746eb084aa3c54f232616b0b3cb"' :
                                        'id="xs-injectables-links-module-NoteProductsModule-d8910b11455529ae7282be11c6edea5460c8a560bf2f245ed6217e0bf3427f8798948f6e134ff3f301ac6dc42ee7ce2037f7d746eb084aa3c54f232616b0b3cb"' }>
                                        <li class="link">
                                            <a href="injectables/NoteProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoteProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotesModule.html" data-type="entity-link" >NotesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NotesModule-e51c41f5048f2c7eb1c5d73ec97c1093013e214f058af81b848a16d12f525f49d1c7cedb375c31733213f2859068278579df721b26686fc9cec54d94bf885f85"' : 'data-target="#xs-controllers-links-module-NotesModule-e51c41f5048f2c7eb1c5d73ec97c1093013e214f058af81b848a16d12f525f49d1c7cedb375c31733213f2859068278579df721b26686fc9cec54d94bf885f85"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotesModule-e51c41f5048f2c7eb1c5d73ec97c1093013e214f058af81b848a16d12f525f49d1c7cedb375c31733213f2859068278579df721b26686fc9cec54d94bf885f85"' :
                                            'id="xs-controllers-links-module-NotesModule-e51c41f5048f2c7eb1c5d73ec97c1093013e214f058af81b848a16d12f525f49d1c7cedb375c31733213f2859068278579df721b26686fc9cec54d94bf885f85"' }>
                                            <li class="link">
                                                <a href="controllers/NotesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NotesModule-e51c41f5048f2c7eb1c5d73ec97c1093013e214f058af81b848a16d12f525f49d1c7cedb375c31733213f2859068278579df721b26686fc9cec54d94bf885f85"' : 'data-target="#xs-injectables-links-module-NotesModule-e51c41f5048f2c7eb1c5d73ec97c1093013e214f058af81b848a16d12f525f49d1c7cedb375c31733213f2859068278579df721b26686fc9cec54d94bf885f85"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotesModule-e51c41f5048f2c7eb1c5d73ec97c1093013e214f058af81b848a16d12f525f49d1c7cedb375c31733213f2859068278579df721b26686fc9cec54d94bf885f85"' :
                                        'id="xs-injectables-links-module-NotesModule-e51c41f5048f2c7eb1c5d73ec97c1093013e214f058af81b848a16d12f525f49d1c7cedb375c31733213f2859068278579df721b26686fc9cec54d94bf885f85"' }>
                                        <li class="link">
                                            <a href="injectables/NotesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ObjectsModule.html" data-type="entity-link" >ObjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ObjectsModule-922ed51cc31f6f9c72c9a63cf3282348be831f8b64bf0fcc354349d3c11e18dd4be2707a7de5f5fe41650bb96d76b650fcafaef95ff6fda048d18237492fcec0"' : 'data-target="#xs-controllers-links-module-ObjectsModule-922ed51cc31f6f9c72c9a63cf3282348be831f8b64bf0fcc354349d3c11e18dd4be2707a7de5f5fe41650bb96d76b650fcafaef95ff6fda048d18237492fcec0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ObjectsModule-922ed51cc31f6f9c72c9a63cf3282348be831f8b64bf0fcc354349d3c11e18dd4be2707a7de5f5fe41650bb96d76b650fcafaef95ff6fda048d18237492fcec0"' :
                                            'id="xs-controllers-links-module-ObjectsModule-922ed51cc31f6f9c72c9a63cf3282348be831f8b64bf0fcc354349d3c11e18dd4be2707a7de5f5fe41650bb96d76b650fcafaef95ff6fda048d18237492fcec0"' }>
                                            <li class="link">
                                                <a href="controllers/ObjectsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ObjectsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ObjectsModule-922ed51cc31f6f9c72c9a63cf3282348be831f8b64bf0fcc354349d3c11e18dd4be2707a7de5f5fe41650bb96d76b650fcafaef95ff6fda048d18237492fcec0"' : 'data-target="#xs-injectables-links-module-ObjectsModule-922ed51cc31f6f9c72c9a63cf3282348be831f8b64bf0fcc354349d3c11e18dd4be2707a7de5f5fe41650bb96d76b650fcafaef95ff6fda048d18237492fcec0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ObjectsModule-922ed51cc31f6f9c72c9a63cf3282348be831f8b64bf0fcc354349d3c11e18dd4be2707a7de5f5fe41650bb96d76b650fcafaef95ff6fda048d18237492fcec0"' :
                                        'id="xs-injectables-links-module-ObjectsModule-922ed51cc31f6f9c72c9a63cf3282348be831f8b64bf0fcc354349d3c11e18dd4be2707a7de5f5fe41650bb96d76b650fcafaef95ff6fda048d18237492fcec0"' }>
                                        <li class="link">
                                            <a href="injectables/ObjectsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ObjectsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrdersModule-63bb60eaf78e815cec546720fca0b19d88a189a37f401a054075e31a1b9528362d822fafaea02ca26864ac6d11a2e7a1363993b57110ef34a5caa829ca2be7ba"' : 'data-target="#xs-controllers-links-module-OrdersModule-63bb60eaf78e815cec546720fca0b19d88a189a37f401a054075e31a1b9528362d822fafaea02ca26864ac6d11a2e7a1363993b57110ef34a5caa829ca2be7ba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-63bb60eaf78e815cec546720fca0b19d88a189a37f401a054075e31a1b9528362d822fafaea02ca26864ac6d11a2e7a1363993b57110ef34a5caa829ca2be7ba"' :
                                            'id="xs-controllers-links-module-OrdersModule-63bb60eaf78e815cec546720fca0b19d88a189a37f401a054075e31a1b9528362d822fafaea02ca26864ac6d11a2e7a1363993b57110ef34a5caa829ca2be7ba"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrdersModule-63bb60eaf78e815cec546720fca0b19d88a189a37f401a054075e31a1b9528362d822fafaea02ca26864ac6d11a2e7a1363993b57110ef34a5caa829ca2be7ba"' : 'data-target="#xs-injectables-links-module-OrdersModule-63bb60eaf78e815cec546720fca0b19d88a189a37f401a054075e31a1b9528362d822fafaea02ca26864ac6d11a2e7a1363993b57110ef34a5caa829ca2be7ba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-63bb60eaf78e815cec546720fca0b19d88a189a37f401a054075e31a1b9528362d822fafaea02ca26864ac6d11a2e7a1363993b57110ef34a5caa829ca2be7ba"' :
                                        'id="xs-injectables-links-module-OrdersModule-63bb60eaf78e815cec546720fca0b19d88a189a37f401a054075e31a1b9528362d822fafaea02ca26864ac6d11a2e7a1363993b57110ef34a5caa829ca2be7ba"' }>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PeopleModule.html" data-type="entity-link" >PeopleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PeopleModule-f7331a39274f86f8a25d67a4179bacf5f9322acfe6cbb0a74a980f4a23161b1ea4661400bd2f37050399998f7098803f80b2b955b03db00a8f9ab2a29173a792"' : 'data-target="#xs-controllers-links-module-PeopleModule-f7331a39274f86f8a25d67a4179bacf5f9322acfe6cbb0a74a980f4a23161b1ea4661400bd2f37050399998f7098803f80b2b955b03db00a8f9ab2a29173a792"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PeopleModule-f7331a39274f86f8a25d67a4179bacf5f9322acfe6cbb0a74a980f4a23161b1ea4661400bd2f37050399998f7098803f80b2b955b03db00a8f9ab2a29173a792"' :
                                            'id="xs-controllers-links-module-PeopleModule-f7331a39274f86f8a25d67a4179bacf5f9322acfe6cbb0a74a980f4a23161b1ea4661400bd2f37050399998f7098803f80b2b955b03db00a8f9ab2a29173a792"' }>
                                            <li class="link">
                                                <a href="controllers/PeopleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PeopleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PeopleModule-f7331a39274f86f8a25d67a4179bacf5f9322acfe6cbb0a74a980f4a23161b1ea4661400bd2f37050399998f7098803f80b2b955b03db00a8f9ab2a29173a792"' : 'data-target="#xs-injectables-links-module-PeopleModule-f7331a39274f86f8a25d67a4179bacf5f9322acfe6cbb0a74a980f4a23161b1ea4661400bd2f37050399998f7098803f80b2b955b03db00a8f9ab2a29173a792"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PeopleModule-f7331a39274f86f8a25d67a4179bacf5f9322acfe6cbb0a74a980f4a23161b1ea4661400bd2f37050399998f7098803f80b2b955b03db00a8f9ab2a29173a792"' :
                                        'id="xs-injectables-links-module-PeopleModule-f7331a39274f86f8a25d67a4179bacf5f9322acfe6cbb0a74a980f4a23161b1ea4661400bd2f37050399998f7098803f80b2b955b03db00a8f9ab2a29173a792"' }>
                                        <li class="link">
                                            <a href="injectables/PeopleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PeopleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RealisationsModule.html" data-type="entity-link" >RealisationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RealisationsModule-e5607d976dd3705d8da70ff0fb0ef9f0db274106d850fa9a1676d078b649a8a74f019d9619082f27af70b3013a5d7d25b14cf51073a3e625ee7d97f9e985a346"' : 'data-target="#xs-controllers-links-module-RealisationsModule-e5607d976dd3705d8da70ff0fb0ef9f0db274106d850fa9a1676d078b649a8a74f019d9619082f27af70b3013a5d7d25b14cf51073a3e625ee7d97f9e985a346"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RealisationsModule-e5607d976dd3705d8da70ff0fb0ef9f0db274106d850fa9a1676d078b649a8a74f019d9619082f27af70b3013a5d7d25b14cf51073a3e625ee7d97f9e985a346"' :
                                            'id="xs-controllers-links-module-RealisationsModule-e5607d976dd3705d8da70ff0fb0ef9f0db274106d850fa9a1676d078b649a8a74f019d9619082f27af70b3013a5d7d25b14cf51073a3e625ee7d97f9e985a346"' }>
                                            <li class="link">
                                                <a href="controllers/RealisationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RealisationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RealisationsModule-e5607d976dd3705d8da70ff0fb0ef9f0db274106d850fa9a1676d078b649a8a74f019d9619082f27af70b3013a5d7d25b14cf51073a3e625ee7d97f9e985a346"' : 'data-target="#xs-injectables-links-module-RealisationsModule-e5607d976dd3705d8da70ff0fb0ef9f0db274106d850fa9a1676d078b649a8a74f019d9619082f27af70b3013a5d7d25b14cf51073a3e625ee7d97f9e985a346"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RealisationsModule-e5607d976dd3705d8da70ff0fb0ef9f0db274106d850fa9a1676d078b649a8a74f019d9619082f27af70b3013a5d7d25b14cf51073a3e625ee7d97f9e985a346"' :
                                        'id="xs-injectables-links-module-RealisationsModule-e5607d976dd3705d8da70ff0fb0ef9f0db274106d850fa9a1676d078b649a8a74f019d9619082f27af70b3013a5d7d25b14cf51073a3e625ee7d97f9e985a346"' }>
                                        <li class="link">
                                            <a href="injectables/RealisationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RealisationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportsModule.html" data-type="entity-link" >ReportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' : 'data-target="#xs-controllers-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' :
                                            'id="xs-controllers-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' }>
                                            <li class="link">
                                                <a href="controllers/ReportsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' : 'data-target="#xs-injectables-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' :
                                        'id="xs-injectables-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' }>
                                        <li class="link">
                                            <a href="injectables/ReportsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TendersModule.html" data-type="entity-link" >TendersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TendersModule-d53688fe3f4f42bc748cd6794dfb3ac0ee177a14599ee5de5cc2f1255b57a29827be0eeb67908432a5063661c86983689a1c115d200b90169aff3671aafd7da3"' : 'data-target="#xs-controllers-links-module-TendersModule-d53688fe3f4f42bc748cd6794dfb3ac0ee177a14599ee5de5cc2f1255b57a29827be0eeb67908432a5063661c86983689a1c115d200b90169aff3671aafd7da3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TendersModule-d53688fe3f4f42bc748cd6794dfb3ac0ee177a14599ee5de5cc2f1255b57a29827be0eeb67908432a5063661c86983689a1c115d200b90169aff3671aafd7da3"' :
                                            'id="xs-controllers-links-module-TendersModule-d53688fe3f4f42bc748cd6794dfb3ac0ee177a14599ee5de5cc2f1255b57a29827be0eeb67908432a5063661c86983689a1c115d200b90169aff3671aafd7da3"' }>
                                            <li class="link">
                                                <a href="controllers/TendersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TendersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TendersModule-d53688fe3f4f42bc748cd6794dfb3ac0ee177a14599ee5de5cc2f1255b57a29827be0eeb67908432a5063661c86983689a1c115d200b90169aff3671aafd7da3"' : 'data-target="#xs-injectables-links-module-TendersModule-d53688fe3f4f42bc748cd6794dfb3ac0ee177a14599ee5de5cc2f1255b57a29827be0eeb67908432a5063661c86983689a1c115d200b90169aff3671aafd7da3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TendersModule-d53688fe3f4f42bc748cd6794dfb3ac0ee177a14599ee5de5cc2f1255b57a29827be0eeb67908432a5063661c86983689a1c115d200b90169aff3671aafd7da3"' :
                                        'id="xs-injectables-links-module-TendersModule-d53688fe3f4f42bc748cd6794dfb3ac0ee177a14599ee5de5cc2f1255b57a29827be0eeb67908432a5063661c86983689a1c115d200b90169aff3671aafd7da3"' }>
                                        <li class="link">
                                            <a href="injectables/TendersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TendersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ApplicationsController.html" data-type="entity-link" >ApplicationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CheckoutsController.html" data-type="entity-link" >CheckoutsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CheckoutsProductsController.html" data-type="entity-link" >CheckoutsProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ContragentsController.html" data-type="entity-link" >ContragentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DocumentController.html" data-type="entity-link" >DocumentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NomenklaturaController.html" data-type="entity-link" >NomenklaturaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NoteProductsController.html" data-type="entity-link" >NoteProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotesController.html" data-type="entity-link" >NotesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ObjectsController.html" data-type="entity-link" >ObjectsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrdersController.html" data-type="entity-link" >OrdersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PeopleController.html" data-type="entity-link" >PeopleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RealisationsController.html" data-type="entity-link" >RealisationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReportsController.html" data-type="entity-link" >ReportsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TendersController.html" data-type="entity-link" >TendersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Application.html" data-type="entity-link" >Application</a>
                            </li>
                            <li class="link">
                                <a href="classes/Checkout.html" data-type="entity-link" >Checkout</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckoutsProduct.html" data-type="entity-link" >CheckoutsProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/Contragent.html" data-type="entity-link" >Contragent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateApplicationDto.html" data-type="entity-link" >CreateApplicationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCheckoutDto.html" data-type="entity-link" >CreateCheckoutDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCheckoutsProductDto.html" data-type="entity-link" >CreateCheckoutsProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContragentDto.html" data-type="entity-link" >CreateContragentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDocumentDto.html" data-type="entity-link" >CreateDocumentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNomenklaturaDto.html" data-type="entity-link" >CreateNomenklaturaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNoteDto.html" data-type="entity-link" >CreateNoteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNoteProductDto.html" data-type="entity-link" >CreateNoteProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateObjectDto.html" data-type="entity-link" >CreateObjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePersonDto.html" data-type="entity-link" >CreatePersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRealisationDto.html" data-type="entity-link" >CreateRealisationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReportDto.html" data-type="entity-link" >CreateReportDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTenderDto.html" data-type="entity-link" >CreateTenderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Document.html" data-type="entity-link" >Document</a>
                            </li>
                            <li class="link">
                                <a href="classes/Nomenklatura.html" data-type="entity-link" >Nomenklatura</a>
                            </li>
                            <li class="link">
                                <a href="classes/Note.html" data-type="entity-link" >Note</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoteProduct.html" data-type="entity-link" >NoteProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObjectsModel.html" data-type="entity-link" >ObjectsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/Person.html" data-type="entity-link" >Person</a>
                            </li>
                            <li class="link">
                                <a href="classes/Report.html" data-type="entity-link" >Report</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tender.html" data-type="entity-link" >Tender</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateApplicationDto.html" data-type="entity-link" >UpdateApplicationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCheckoutDto.html" data-type="entity-link" >UpdateCheckoutDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCheckoutsProductDto.html" data-type="entity-link" >UpdateCheckoutsProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContragentDto.html" data-type="entity-link" >UpdateContragentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDocumentDto.html" data-type="entity-link" >UpdateDocumentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNomenklaturaDto.html" data-type="entity-link" >UpdateNomenklaturaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNoteDto.html" data-type="entity-link" >UpdateNoteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNoteProductDto.html" data-type="entity-link" >UpdateNoteProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateObjectDto.html" data-type="entity-link" >UpdateObjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrderDto.html" data-type="entity-link" >UpdateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePersonDto.html" data-type="entity-link" >UpdatePersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRealisationDto.html" data-type="entity-link" >UpdateRealisationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReportDto.html" data-type="entity-link" >UpdateReportDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTenderDto.html" data-type="entity-link" >UpdateTenderDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApplicationsService.html" data-type="entity-link" >ApplicationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CheckoutsProductsService.html" data-type="entity-link" >CheckoutsProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CheckoutsService.html" data-type="entity-link" >CheckoutsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContragentsService.html" data-type="entity-link" >ContragentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocumentService.html" data-type="entity-link" >DocumentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NomenklaturaService.html" data-type="entity-link" >NomenklaturaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NoteProductsService.html" data-type="entity-link" >NoteProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotesService.html" data-type="entity-link" >NotesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObjectsService.html" data-type="entity-link" >ObjectsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PeopleService.html" data-type="entity-link" >PeopleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RealisationsService.html" data-type="entity-link" >RealisationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportsService.html" data-type="entity-link" >ReportsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TendersService.html" data-type="entity-link" >TendersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});