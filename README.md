# README

# DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
|last_name|string|null: false|
|first_name|string|null: false|
|last_name_fri|string|null: false|
|first_name_fri|string|null: false|
|birth_year|integer|null: false|
|birth_month|integer|null: false|
|birth_day|integer|null: false|

### Association
- has_many:products, dependent: :destroy
- has_many:cards, dependent: :destroy
- has_many:shopping_address, dependent:destroy
- has_many:Purchase_historys, dependent:destroy

## cardsテーブル
|Column|Type|Options|
|------|----|-------|
|customer_id|string|null: false|
|card_id|string|null: false|
|user_id|references|foreign_key: true|
### Association
- belongs_to :user

## addressテーブル
|Column|Type|Options|
|------|----|-------|
|address_name|string|null: false|
|address_furi|string|null: false|
|post_num|string|null: false|
|prefecture|string|null: false|
|city|string|null: false|
|address|string|null: false|
|billding|string|
|phone_number|string|
|user|references|foreign_key: true|
### Association
- belongs_to :user

## productsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|content|text|null: false|
|category|references|null: false, foreign_key: true|
|brand|text|null: false|
|condition_id|integer|null: false|
|fee_id|integer|null: false|
|area_id|integer|null: false|
|shippingday_id|integer|null: false|
|price|integer|null: false|
|user|references|null: false, foreign_key: true|
### Association
- has_many: photos 
- belongs_to: user
- belongs_to: category
- belongs_to_active_hash: condition
- belongs_to_active_hash: fee
- belongs_to_active_hash: area
- belongs_to_active_hash: shippingday

## photosテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|product|references|null: false, foreign_key: true|
### Association
- belongs_to: product

## categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|ancestry|string|null: false|

### Association
- has_many :products
- has_ancestry

## brandsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|
|item|references|null: false, foreign_key: true|
|ancestry|string|null: false|
### Association
- has_many :items
- has_ancestry

## Purchase_historysテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|user_buyer|references|foreign_key: true|
|item|references|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :item

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|user|references|null: false, foreign_key: true|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :item

## ratesテーブル
|Column|Type|Options|
|------|----|-------|
|rate|string|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to: user