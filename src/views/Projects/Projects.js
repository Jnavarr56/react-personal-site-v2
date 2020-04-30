import React from 'react'
import styled from 'styled-components'

const ProjectsPage = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`
// const CardContainer = styled.div`
//     width: 90vw;
//     max-width: 260px;
//     height: 300px;

//     & .swipe {
//         position: absolute;
//     }
// `

// const CardDiv = styled.div`
//   position: relative;
//   background-color: #fff;
//   width: 80vw;
//   max-width: 260px;
//   height: 300px;
//   box-shadow: 0px 0px 60px 0px rgba(0,0,0,0.30);
//   border-radius: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `
const Projects = props => {
	return (
		<ProjectsPage>
			{/* <Cards onEnd={hi => console.log(hi)}>
                {db.map(card => {
                    return (
                        <Card key={card.name}>
                            <h1>{card.name}</h1>
                        </Card>
                    )
                })}
            </Cards> */}
			{/* <CardContainer>
                {db.map(card => {
                    return (
                        <TinderCard className={'swipe'} key={card.name}>
                            <CardDiv>
                                {card.name}
                            </CardDiv>
                        </TinderCard>
                    )
                })}
            </CardContainer> */}
		</ProjectsPage>
	)
}

export default Projects
