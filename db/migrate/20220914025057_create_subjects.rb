class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.text :body
      t.belongs_to :todo, null: false, foreign_key: true

      t.timestamps
    end
  end
end
