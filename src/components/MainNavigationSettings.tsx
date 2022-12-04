import { Button, Flex, FlexItem, Header, Input, SearchIcon, Text, Accordion } from '@fluentui/react-northstar';
import React, { Component } from 'react';
import MainMenu from '../models/MainMenu';

export interface MainNavigationSettingsProps {

}
export interface MainNavigationSettingsState {
  mainMenu:MainMenu;
  successMessage:string;
}
export default class MainNavigationSettings extends Component<MainNavigationSettingsProps, MainNavigationSettingsState>{

    constructor(props:any){
        super(props); 
        this.state = {
            mainMenu:this.getMainMenuFromLocalStorage(),
            successMessage:""
        }
      }
    render(): React.ReactNode {
        const panels = [
            {
            title: 'NavigationItem Item 1',
            content: (
                <Accordion panels={this.getSubPanelItems()}>
                </Accordion>
            ),
            },
            {
                title: 'NavigationItem Item 2',
                content: (
                    <Accordion panels={this.getSubPanelItems()}>
                    </Accordion>
                ),
            },
            {
                title: 'NavigationItem Item 3',
                content: (
                    <Accordion panels={this.getSubPanelItems()}>
                    </Accordion>
                ),
            },
            {
                title: 'NavigationItem Item 4',
                content: (
                    <Accordion panels={this.getSubPanelItems()}>
                    </Accordion>
                ),
            },
            {
                title: 'NavigationItem Item 5',
                content: (
                    <Accordion panels={this.getSubPanelItems()}>
                    </Accordion>
                ),
            },
        ];
        const{successMessage} = this.state;
        return(
            <React.Fragment>
                <Flex column gap="gap.small" vAlign="stretch">
                        <Header content={`Configure Navigation`} as="h3"/>
                </Flex>
                <FlexItem size='size.full'>
                        <Text content={`The Mega Menu can be configured here`} size={`medium`} weight={`regular`}/>
                </FlexItem>
                <FlexItem size='size.full'>
                    <Header content={`Add Navigation Entries`} as="h4"/>
                </FlexItem>
                <FlexItem size='size.full'>
                    <Text content={`Here is an example of how a section can be used to group inputs `} size={`medium`} weight={`regular`}/>
                </FlexItem>
                <br></br>
                <br></br>
                <FlexItem>
                <Flex gap="gap.large">
                    <Button content="+ Add" primary onClick={this.addMainNavigationEntry}/>
                    <Input fluid icon={<SearchIcon />} placeholder="Search for a navigation entry" />
                </Flex>
                </FlexItem>
                {successMessage && (
                    <FlexItem>
                    <Text success content={successMessage} />
                    </FlexItem>
                )}
                
                <br></br>
                <br></br>
                <Accordion defaultActiveIndex={[0]} panels={panels} />
                <br></br>
                <br></br>
                <Flex gap="gap.small">
                    <FlexItem push>
                        <Button content="Discard"/>
                    </FlexItem>
                    <Button content="Save" primary onClick={this.saveMenuItem}/>
                </Flex>
           </React.Fragment>
        )
    }

    addMainNavigationEntry = () =>{
        let existingItems = this.state.mainMenu;
        if(existingItems){
            let latestItem = existingItems.navigationItems.length;
            existingItems.navigationItems.push(`Navigation Item ${latestItem+1}`);
            this.setState({mainMenu:existingItems, successMessage:`Navigation Item ${latestItem+1} successfully added. Click on Save to see the change.`});
        }
        else{
            let mainMenu: MainMenu={
                navigationItems: ["Navigation Item 1"],
                subNavigationItems: [],
                subSubNavigationItems: []
            }
            this.setState({mainMenu:mainMenu,successMessage:`Navigation Item 1 successfully added. Click on Save to see the change.`});
        }
    }
    getMainMenuFromLocalStorage = () :any =>  {
        if(localStorage.getItem("navigationItemsList") != null){
            var menu: MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
            return menu;
        }
        else{
            return null;
        }
    }

    saveMenuItem = () =>{
        let existingItems = this.state.mainMenu;
        localStorage.setItem("navigationItemsList", JSON.stringify(existingItems));
        window.location.reload();
    }

    getSubPanelItems = ():any =>{
        const panels = [
            {
            title: 'Sub NavigationItem Item 1',
            content: 'Sub Sub NavigationItem Item 1'
            },
            {
                title: 'Sub NavigationItem Item 2',
                content: 'Sub Sub NavigationItem Item 2'
            },
            {
                    title: 'Sub NavigationItem Item 3',
                    content:'Sub Sub NavigationItem Item 3'
            },
            {
                title: 'Sub NavigationItem Item 4',
                content:'Sub Sub NavigationItem Item 4'
            },
            {
                title: 'Sub NavigationItem Item 5',
                content: 'Sub Sub NavigationItem Item 5'
            },
        ];
        return panels;
    }
}