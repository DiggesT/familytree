import { Segment } from '../../../components/Segment'
import css from './index.module.scss'

const Text = ({ children }: { children: React.ReactNode }) => {
  return <p className={css.text}>{children}</p>
}

export const AboutPage = () => (
  <Segment title="About Family Tree Project" description="Created by: Parkhomenko Danil">
    <Text>
      Welcome to Family Tree projet! It's about to create/edit and share your family tree. There are a few steps below,
      how to use it.
    </Text>
    <Text>
      First, you need to register. Then create your tree with "Tree Manager" menu. After that you can create your tree
      members list using "Add member" menu, to view all members use "All members" menu. To build a tree, you need to
      specify mother and father for each member. And it's done! Now you can view your family tree on "Show Tree" menu,
      also you can show your tree to your friends, using invite function with "Tree Manager" menu.
    </Text>
    <Text>
      I decide to create this project to have fun and improve my web programmer skills. This is an open source project,
      and it's currently under development, more features will coming soon. If you have any ideas about my project or
      advice for a newbie web programmer, let me know.
    </Text>
    <Text>
      GitHub <a href="https://github.com/DiggesT/familytree">repository</a> link.
    </Text>
    <Text>
      My GitHub <a href="https://github.com/DiggesT">account</a>.
    </Text>
  </Segment>
)
