import { Flex, Text, FlexItem, Menu, Segment } from '@fluentui/react-northstar';
import React, { Component } from 'react';
import MainNavigationSettings from './MainNavigationSettings';
import SubNavigationSettings from './SubNavigationSettings';
import SubSubNavigationSettings from './SubSubNavigationSettings';

export interface SettingsProps {

}
export interface SettingsState {
  showMainNavigation:boolean;
  showSubNavigation:boolean;
  showSubSubNavigation: boolean
}
export default class Settings extends Component<SettingsProps, SettingsState>{

    constructor(props:any){
        super(props);
        this.state = {
          showMainNavigation:false,
          showSubNavigation:false,
          showSubSubNavigation: false
        }
      }
    render(): React.ReactNode {
        const settingsItems = [
            { key: 'step1', content: 'Main Navigation', onClick:this.showSettingsForMainNavigation },
            { key: 'step2', content: 'Sub Navigation', onClick:this.showSettingsForSubNavigation },
            { key: 'step3', content: 'Sub Sub Navigation', onClick:this.showSettingsForSubSubNavigation },
          ];
          const adminItems = [
            { key: 'adstep1', content: 'Licensing' },
            { key: 'adstep2', content: 'Administrators' },
          ];
          
        return(
            <React.Fragment>
                <Flex gap="gap.small" padding="padding.medium">
                    <Flex.Item size="size.quarter">
                        <Segment>
                        <Flex>
                            <FlexItem size='size.full'>
                                <Text content={`Settings`} size={`large`} weight={`bold`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Menu defaultActiveIndex={0} items={settingsItems} vertical pointing />
                            </FlexItem>
            
                        </Flex>
                        <Flex>
                            <FlexItem size='size.full'>
                                <Text content={`Administration`} size={`large`} weight={`bold`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Menu defaultActiveIndex={0} items={adminItems} vertical pointing />
                            </FlexItem>  
                        </Flex>
                        </Segment>
                    </Flex.Item>

                    <Flex.Item size="size.thirdquarter" grow>
                        <Segment>
                        {this.state.showMainNavigation && (
                            <MainNavigationSettings></MainNavigationSettings>
                        )}
                        {this.state.showSubNavigation && (
                            <SubNavigationSettings></SubNavigationSettings>
                        )}
                        {this.state.showSubSubNavigation && (
                            <SubSubNavigationSettings></SubSubNavigationSettings>
                        )}
                        </Segment>
                    </Flex.Item>
                    </Flex>
           
          
           </React.Fragment>
        )
    }

    showSettingsForMainNavigation = () =>{
        this.setState({showMainNavigation:true, showSubNavigation:false, showSubSubNavigation: false});
    }
    showSettingsForSubNavigation = () =>{
        this.setState({showSubNavigation:true, showMainNavigation:false, showSubSubNavigation:false});
    }
    showSettingsForSubSubNavigation = () =>{
        this.setState({showSubSubNavigation:true,showSubNavigation:false, showMainNavigation:false});
    }
}