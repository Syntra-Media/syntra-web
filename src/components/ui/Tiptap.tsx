'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Toolbar from './Toolbar'

const Tiptap = ({onChange, content}: any) => {
    const handleChange = (newContent: string) => {
        onChange(newContent)
    };

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: '<p>Buraya yaz!</p>',
        editorProps: {
            attributes: {
                class: "prose-invert prose lg:prose-sm max-w-none [&_ol]:list-decimal [&_ul]:list-disc w-full flex flex-col px-4 py-3 justify-start items-start border border-gray-700 rounded-b-lg min-h-60"
            }
        },

        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML())
        }
    })

    return (
        <div className={"w-full"}>
            <Toolbar editor={editor} content={content}/>
            <EditorContent editor={editor} style={{whiteSpace: "pre-line"}} />
        </div>
    )
}

export default Tiptap