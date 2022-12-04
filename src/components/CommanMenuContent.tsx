import { Flex, FlexItem, Header, Text } from '@fluentui/react-northstar';
import React, { Component } from 'react';

export interface CommanMenuContentProps {

}
export interface CommanMenuContentState {
}
export default class CommanMenuContent extends Component<CommanMenuContentProps, CommanMenuContentState>{

    constructor(props:any){
        super(props); 
        this.state = {
            
        }
      }
    render(): React.ReactNode {
        
          
        return(
            <React.Fragment>
                <Flex gap="gap.small" padding="padding.medium">
                <Flex.Item size="size.half">
                <Flex column gap="gap.small" vAlign="stretch">
                            <Header content={`My Career And Benefits`} as="h3"/>
                            <FlexItem size='size.full'>
                                    <Text content={`HR Web`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Benefits`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Learning Portal`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Internet Jobs`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Company Store`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Other`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                    </Flex>
                </Flex.Item>
                <Flex.Item size="size.half">
                <Flex column gap="gap.small" vAlign="stretch">
                            <Header content={`My Career And Benefits`} as="h3"/>
                            <FlexItem size='size.full'>
                                    <Text content={`HR Web`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Benefits`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Learning Portal`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Internet Jobs`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Company Store`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Other`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                    </Flex>
                </Flex.Item>
                </Flex>
                <Flex gap="gap.small" padding="padding.medium">
                <Flex.Item size="size.half">
                <Flex column gap="gap.small" vAlign="stretch">
                            <Header content={`Travel And Expense`} as="h3"/>
                            <FlexItem size='size.full'>
                                    <Text content={`Travel`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Expenses`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Payments`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`US Immigration Travel`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                    </Flex>
                </Flex.Item>
                <Flex.Item size="size.half">
                <Flex column gap="gap.small" vAlign="stretch">
                <Header content={`Travel And Expense`} as="h3"/>
                            <FlexItem size='size.full'>
                                    <Text content={`Travel`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Expenses`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`Payments`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                            <FlexItem size='size.full'>
                                <Text content={`US Immigration Travel`} size={`medium`} weight={`regular`}/>
                            </FlexItem>
                    </Flex>
                </Flex.Item>
                </Flex>
           </React.Fragment>
        )
    }
}