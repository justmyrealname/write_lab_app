class ArcSerializer < ActiveModel::Serializer
  attributes  :id,
              :title,
              :created_at

  belongs_to :character
  has_many :posts

  class PostSerializer < ActiveModel::Serializer
    attributes :id, :content, :created_at, :character
  end

  class CharacterSerializer < ActiveModel::Serializer
    attributes :name
  end
end
